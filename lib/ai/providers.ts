import {
  customProvider,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model-small': chatModel,
        'chat-model-large': chatModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model-small': openai('gpt-4o-mini'),
        'chat-model-large': anthropic('claude-3-7-sonnet-20250219'),
        'title-model': openai('gpt-4-turbo'),
        'artifact-model': openai('gpt-4o-mini'),
      },
    });
