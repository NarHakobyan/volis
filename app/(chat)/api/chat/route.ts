import {
  type Message,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from 'ai';
import { auth } from '@/app/(auth)/auth';
import { systemPrompt } from '@/lib/ai/prompts';
import {
  deleteChatById,
  getChatById,
  saveChat,
  saveMessages,
} from '@/lib/db/queries';
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from '@/lib/utils';
import { generateTitleFromUserMessage } from '../../actions';
import { createDocument } from '@/lib/ai/tools/create-document';
import { updateDocument } from '@/lib/ai/tools/update-document';
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { isProductionEnvironment } from '@/lib/constants';
import { NextResponse } from 'next/server';
import { myProvider } from '@/lib/ai/providers';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const {
      id,
      messages,
      jobTitle,
      requirements,
      cvUrls,
    }: {
      id: string;
      messages: Array<Message>;
      jobTitle?: string;
      requirements?: string;
      cvUrls?: string[];
    } = await request.json();

    const chatModel = 'chat-model-large';

    const session = await auth();

    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userMessage = getMostRecentUserMessage(messages);

    if (!userMessage) {
      return new Response('No user message found', { status: 400 });
    }

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message: userMessage,
      });

      await saveChat({ id, userId: session.user.id, title });
    } else {
      if (chat.userId !== session.user.id) {
        return new Response('Unauthorized', { status: 401 });
      }
    }

    await saveMessages({
      messages: [{ ...userMessage, createdAt: new Date(), chatId: id }],
    });

    // Handle CV screening for first message if job details are provided
    if (!chat && jobTitle && requirements && cvUrls?.length) {
      const cvScreeningSystemPrompt = `You are an expert HR Specialist. Your task is to analyze CVs against job requirements and provide detailed matching analysis.
Given job requirements and CVs, you should:
1. Extract key skills and experience from the CVs
2. Compare them against job requirements
3. Score matches for each requirement
4. Identify gaps and strengths
5. Provide an overall match percentage
6. Make recommendations`;

      return createDataStreamResponse({
        execute: (dataStream) => {
          const result = streamText({
            model: myProvider.languageModel(chatModel),
            system: cvScreeningSystemPrompt,
            experimental_transform: smoothStream({ chunking: 'word' }),
            experimental_generateMessageId: generateUUID,
            messages: [{
              role: 'user',
              content: `Please analyze the CV(s) against the following job requirements:

Job Title: ${jobTitle}
Requirements: ${requirements}

Provide a detailed matching analysis showing strengths and gaps for the candidate(s).`,
              experimental_attachments: cvUrls.map((url: string) => ({
                url,
                name: url.split('/').pop(),
                contentType: 'application/pdf'
              }))
            }],
            maxTokens: 2000,
            maxSteps: 5,
            experimental_activeTools: [
              'getWeather',
              'createDocument',
              'updateDocument',
              'requestSuggestions',
            ],
            tools: {
              getWeather,
              createDocument: createDocument({ session, dataStream }),
              updateDocument: updateDocument({ session, dataStream }),
              requestSuggestions: requestSuggestions({
                session,
                dataStream,
              }),
            },
            onFinish: async ({ response, reasoning }) => {
              if (session.user?.id) {
                try {
                  const sanitizedResponseMessages = sanitizeResponseMessages({
                    messages: response.messages,
                    reasoning,
                  });

                  await saveMessages({
                    messages: sanitizedResponseMessages.map((message) => {
                      return {
                        id: message.id,
                        chatId: id,
                        role: message.role,
                        content: message.content,
                        createdAt: new Date(),
                      };
                    }),
                  });
                } catch (error) {
                  console.error('Failed to save chat');
                }
              }
            },
            experimental_telemetry: {
              isEnabled: isProductionEnvironment,
              functionId: 'stream-text',
            },
          });

          result.consumeStream();
          result.mergeIntoDataStream(dataStream, {
            sendReasoning: true,
          });
        },
        onError: (e) => {
          console.error(e);
          return 'An error occurred while analyzing the CV.';
        }
      });
    }

    // Handle regular chat messages
    return createDataStreamResponse({
      execute: (dataStream) => {
        // Create a custom system prompt that includes job details if available
        let customSystemPrompt = systemPrompt({ chatModel });
        if (jobTitle && requirements) {
          customSystemPrompt = `${customSystemPrompt}\n\nYou are analyzing CVs for the following job position:\nJob Title: ${jobTitle}\nRequirements: ${requirements}\n\nWhen answering questions, refer to the CV content and these job requirements.`;
        }

        const result = streamText({
          model: myProvider.languageModel(chatModel),
          system: customSystemPrompt,
          messages: cvUrls?.length
            ? messages.map(msg =>
                msg.role === 'user' && msg.id === userMessage.id
                  ? {
                      ...msg,
                      experimental_attachments: cvUrls.map((url: string) => ({
                        url,
                        name: url.split('/').pop(),
                        contentType: 'application/pdf'
                      }))
                    }
                  : msg
              )
            : messages,
          maxSteps: 5,
          experimental_activeTools:
            chatModel === 'chat-model-reasoning'
              ? []
              : [
                  'getWeather',
                  'createDocument',
                  'updateDocument',
                  'requestSuggestions',
                ],
          experimental_transform: smoothStream({ chunking: 'word' }),
          experimental_generateMessageId: generateUUID,
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
            }),
          },
          onFinish: async ({ response, reasoning }) => {
            if (session.user?.id) {
              try {
                const sanitizedResponseMessages = sanitizeResponseMessages({
                  messages: response.messages,
                  reasoning,
                });

                await saveMessages({
                  messages: sanitizedResponseMessages.map((message) => {
                    return {
                      id: message.id,
                      chatId: id,
                      role: message.role,
                      content: message.content,
                      createdAt: new Date(),
                    };
                  }),
                });
              } catch (error) {
                console.error('Failed to save chat');
              }
            }
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: 'stream-text',
          },
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: (e) => {
        console.error(e);
        return 'Oops, an error occured!';
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    await deleteChatById({ id });

    return new Response('Chat deleted', { status: 200 });
  } catch (error) {
    return new Response('An error occurred while processing your request', {
      status: 500,
    });
  }
}
