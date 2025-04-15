# Artifacts

Artifacts is a special user interface mode that allows you to have a workspace-like interface along with the chat interface. This is similar to [ChatGPT's Canvas](https://openai.com/index/introducing-canvas) and [Claude's Artifacts](https://www.anthropic.com/news/artifacts).

The CV-Job Matching AI ships with the following artifacts:

- **Text Artifact**: A artifact that allows you to work with text content like drafting essays and emails.
- **Code Artifact**: A artifact that allows you to write and execute code (Python).
- **Image Artifact**: A artifact that allows you to work with images like editing, annotating, and processing images.
- **Sheet Artifact**: A artifact that allows you to work with tabular data like creating, editing, and analyzing data.
- **CV Matching Artifact**: A specialized artifact for uploading CVs and job descriptions, analyzing them, and providing matching scores and detailed analysis.

## CV Matching Artifact

The CV Matching Artifact is the core feature of this application. It allows users to:

1. Upload a CV document (PDF, DOCX, or plain text)
2. Input job requirements and responsibilities
3. Get an AI-powered analysis of how well the CV matches the job requirements
4. Receive a detailed breakdown of matching skills, experience, and qualifications
5. Get a numerical matching score and recommendations for improvement

The artifact uses advanced AI models to extract information from both the CV and job description, compare them semantically, and provide actionable insights.

## Adding a Custom Artifact

To add a custom artifact, you will need to create a folder in the `artifacts` directory with the artifact name. The folder should contain the following files:

- `client.tsx`: The client-side code for the artifact.
- `server.ts`: The server-side code for the artifact.

Here is an example of a custom artifact called `CustomArtifact`:

```bash
artifacts/
  custom/
    client.tsx
    server.ts
```

### Client-Side Example (client.tsx)

This file is responsible for rendering your custom artifact. You might replace the inner UI with your own components, but the overall pattern (initialization, handling streamed data, and rendering content) remains the same. For instance:

```tsx
import { Artifact } from "@/components/create-artifact";
import { ExampleComponent } from "@/components/example-component";
import { toast } from "sonner";

interface CustomArtifactMetadata {
  // Define metadata your custom artifact might need—the example below is minimal.
  info: string;
}

export const customArtifact = new Artifact<"custom", CustomArtifactMetadata>({
  kind: "custom",
  description: "A custom artifact for demonstrating custom functionality.",
  // Initialization can fetch any extra data or perform side effects
  initialize: async ({ documentId, setMetadata }) => {
    // For example, initialize the artifact with default metadata.
    setMetadata({
      info: `Document ${documentId} initialized.`,
    });
  },
  // Handle streamed parts from the server (if your artifact supports streaming updates)
  onStreamPart: ({ streamPart, setMetadata, setArtifact }) => {
    if (streamPart.type === "info-update") {
      setMetadata((metadata) => ({
        ...metadata,
        info: streamPart.content as string,
      }));
    }
    if (streamPart.type === "content-update") {
      setArtifact((draftArtifact) => ({
        ...draftArtifact,
        content: draftArtifact.content + (streamPart.content as string),
        status: "streaming",
      }));
    }
  },
  // Defines how the artifact content is rendered
  content: ({
    mode,
    status,
    content,
    isCurrentVersion,
    currentVersionIndex,
    onSaveContent,
    getDocumentContentById,
    isLoading,
    metadata,
  }) => {
    if (isLoading) {
      return <div>Loading custom artifact...</div>;
    }

    if (mode === "diff") {
      const oldContent = getDocumentContentById(currentVersionIndex - 1);
      const newContent = getDocumentContentById(currentVersionIndex);
      return (
        <div>
          <h3>Diff View</h3>
          <pre>{oldContent}</pre>
          <pre>{newContent}</pre>
        </div>
      );
    }

    return (
      <div className="custom-artifact">
        <ExampleComponent
          content={content}
          metadata={metadata}
          onSaveContent={onSaveContent}
          isCurrentVersion={isCurrentVersion}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast.success("Content copied to clipboard!");
          }}
        >
          Copy
        </button>
      </div>
    );
  },
  // An optional set of actions exposed in the artifact toolbar.
  actions: [
    {
      icon: <span>⟳</span>,
      description: "Refresh artifact info",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Please refresh the info for my custom artifact.",
        });
      },
    },
  ],
  // Additional toolbar actions for more control
  toolbar: [
    {
      icon: <span>✎</span>,
      description: "Edit custom artifact",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Edit the custom artifact content.",
        });
      },
    },
  ],
});
```

### Server-Side Example (server.ts)

The server file processes the document for the artifact. It streams updates (if applicable) and returns the final content. For example:

```ts
import { smoothStream, streamText } from "ai";
import { myProvider } from "@/lib/ai/providers";
import { createDocumentHandler } from "@/lib/artifacts/server";
import { updateDocumentPrompt } from "@/lib/ai/prompts";

export const customDocumentHandler = createDocumentHandler<"custom">({
  kind: "custom",
  // Called when the document is first created.
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = "";
    // For demonstration, use streamText to generate content.
    const { fullStream } = streamText({
      model: myProvider.languageModel("artifact-model"),
      system:
        "Generate a creative piece based on the title. Markdown is supported.",
      experimental_transform: smoothStream({ chunking: "word" }),
      prompt: title,
    });

    // Stream the content back to the client.
    for await (const delta of fullStream) {
      if (delta.type === "text-delta") {
        draftContent += delta.textDelta;
        dataStream.writeData({
          type: "content-update",
          content: delta.textDelta,
        });
      }
    }

    return draftContent;
  },
  // Called when updating the document based on user modifications.
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = "";
    const { fullStream } = streamText({
      model: myProvider.languageModel("artifact-model"),
      system: updateDocumentPrompt(document.content, "custom"),
      experimental_transform: smoothStream({ chunking: "word" }),
      prompt: description,
      experimental_providerMetadata: {
        openai: {
          prediction: {
            type: "content",
            content: document.content,
          },
        },
      },
    });

    for await (const delta of fullStream) {
      if (delta.type === "text-delta") {
        draftContent += delta.textDelta;
        dataStream.writeData({
          type: "content-update",
          content: delta.textDelta,
        });
      }
    }

    return draftContent;
  },
});
```

## Creating a CV Matching Artifact

To implement the CV Matching artifact, you would create a new folder in the `artifacts` directory:

```bash
artifacts/
  cv-matching/
    client.tsx
    server.ts
```

The CV Matching artifact would include specialized UI components for:
- File upload for CV documents
- Text input for job descriptions
- Visualization of matching scores
- Detailed analysis of skills, experience, and qualifications
- Recommendations for improving the match

Once you have created the client and server files, you can import the artifact in the `lib/artifacts/server.ts` file and add it to the `documentHandlersByArtifactKind` array.

```ts
export const documentHandlersByArtifactKind: Array<DocumentHandler> = [
  ...,
  cvMatchingDocumentHandler,
];

export const artifactKinds = [..., "cv-matching"] as const;
```

Specify it in document schema at `lib/db/schema.ts`.

```ts
export const document = pgTable(
  "Document",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("text", { enum: [..., "cv-matching"] }) // Add the CV matching artifact kind here
      .notNull()
      .default("text"),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdAt] }),
    };
  },
);
```

And also add the client-side artifact to the `artifactDefinitions` array in the `components/artifact.tsx` file.

```ts
import { cvMatchingArtifact } from "@/artifacts/cv-matching/client";

export const artifactDefinitions = [..., cvMatchingArtifact];
```

You should now be able to see the CV Matching artifact in the workspace!
