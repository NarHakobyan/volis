'use client';
import { useState } from 'react';
import { useChat, } from '@ai-sdk/react';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';
import { Chat } from '@/components/chat';
import { CVUploadSection } from '@/components/cv-upload-section';
import { DataStreamHandler } from '@/components/data-stream-handler';

interface ChatWithCVUploadProps {
  id: string;
}

interface JobDetails {
  jobTitle: string;
  requirements: string;
  cvUrls: string[];
}

export function ChatWithCVUpload({ id }: ChatWithCVUploadProps) {
  const { mutate } = useSWRConfig();
  const [showChat, setShowChat] = useState(false);
  const [cvUrls, setCvUrls] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [requirements, setRequirements] = useState<string>('');

  const {
    messages,
    setMessages,
    input,
    setInput,
    append,
  } = useChat({
    id,
    body: { id, cvUrls },
    initialMessages: [],
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    onFinish: () => {
      mutate('/api/history');
    },
    onError: () => {
      toast.error('An error occurred, please try again!');
    },
  });

  const handleAppendMessage = async (message: string, jobDetails?: JobDetails) => {
    // Store CV URLs and job details for future messages
    if (jobDetails?.cvUrls?.length) {
      setCvUrls(jobDetails.cvUrls);

      if (jobDetails.jobTitle) {
        setJobTitle(jobDetails.jobTitle);
      }

      if (jobDetails.requirements) {
        setRequirements(jobDetails.requirements);
      }
    }

    // Show the chat interface even if the message is empty
    // This will trigger the "Thinking" state when an empty message is passed
    setShowChat(true);

    // If the message is empty, don't append it to the chat
    // This is used to show the "Thinking" state without adding a user message
    if (!message.trim() && jobDetails) {
      return;
    }

    const data = jobDetails ? {
      jobTitle: jobDetails.jobTitle,
      requirements: jobDetails.requirements,
      cvUrls: jobDetails.cvUrls,
      id,
    } : {
      id,
      cvUrls, // Pass stored CV URLs for regular messages
      jobTitle, // Include job title for context
      requirements, // Include requirements for context
    };

    await append({
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
    }, {
      body: data
    });
  };

  // Handler for sending messages from the Chat component
  const handleSendMessage = async (message: string) => {
    await handleAppendMessage(message);
  };

  return (
    <>
      {!showChat ? (
        <CVUploadSection
          chatId={id}
          onAppendMessage={handleAppendMessage}
        />
      ) : (
        <>
          <Chat
            key={id}
            id={id}
            initialMessages={messages}
            isReadonly={false}
            cvUrls={cvUrls}
            onSendMessage={handleSendMessage}
          />
          <DataStreamHandler id={id} />
        </>
      )}
    </>
  );
}
