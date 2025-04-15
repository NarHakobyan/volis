# Update Models

The CV-Job Matching AI ships with [OpenAI](https://sdk.vercel.ai/providers/ai-sdk-providers/openai) as the default model provider. Since the application is powered by the [AI SDK](https://sdk.vercel.ai), which supports [multiple providers](https://sdk.vercel.ai/providers/ai-sdk-providers) out of the box, you can easily switch to another provider of your choice.

For optimal CV-Job matching performance, we recommend using models with strong reasoning capabilities and document understanding, such as GPT-4o or Claude 3.5 Sonnet.

To update the models, you will need to update the custom provider called `myProvider` at `/lib/ai/models.ts` shown below.

```ts
import { customProvider } from "ai";
import { openai } from "@ai-sdk/openai";

export const myProvider = customProvider({
  languageModels: {
    "chat-model-small": openai("gpt-4o-mini"),
    "chat-model-large": openai("gpt-4o"),
    "title-model": openai("gpt-4-turbo"),
    "artifact-model": openai("gpt-4o-mini"),
  },
  imageModels: {
    "small-model": openai.image("dall-e-3"),
  },
});
```

You can replace the `openai` models with any other provider of your choice. You will need to install the provider library and switch the models accordingly.

For example, if you want to use Anthropic's `claude-3-5-sonnet` model for `chat-model-large`, you can replace the `openai` model with the `anthropic` model as shown below.

```ts
import { customProvider } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const myProvider = customProvider({
  languageModels: {
    "chat-model-small": openai("gpt-4o-mini"),
    "chat-model-large": anthropic("claude-3-7-sonnet"), // Replace openai with anthropic
    "title-model": openai("gpt-4-turbo"),
    "artifact-model": openai("gpt-4o-mini"),
  },
});
```

You can find the provider library and model names in the [provider](https://sdk.vercel.ai/providers/ai-sdk-providers)'s documentation. Once you have updated the models, you should be able to use the new models in your CV-Job Matching AI.

For CV-Job matching, we recommend models with:
- Strong document understanding capabilities
- Ability to extract structured information from text
- Reasoning capabilities to compare requirements with qualifications
- Ability to provide detailed analysis and scoring
