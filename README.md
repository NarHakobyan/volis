# CV-Job Matching AI

<a href="https://chat.vercel.ai/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="app/(chat)/opengraph-image.png">
  <h1 align="center">Next.js AI Chatbot</h1>
</a>

<p align="center">
  An AI-powered tool for matching CVs with job requirements and providing detailed analysis.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#how-it-works"><strong>How It Works</strong></a> ·
  <a href="#for-companies"><strong>For Companies</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- **CV-Job Matching Analysis**: Upload CVs and job descriptions to get detailed matching analysis
- **Matching Score**: Receive a numerical score indicating how well a CV matches job requirements
- **Skills Analysis**: Identify matching and missing skills between CV and job requirements
- **Experience Evaluation**: Analyze relevant experience and qualifications
- **Improvement Recommendations**: Get actionable suggestions to improve CV for specific jobs
- **Bulk CV Processing**: Companies can upload and analyze multiple CVs simultaneously
- **Candidate Ranking**: Sort and filter candidates based on matching scores and specific criteria

### Technical Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://sdk.vercel.ai/docs)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports OpenAI (default), Anthropic, Cohere, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Storage
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient CV file storage
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
  - Simple and secure authentication

## How It Works

1. **Upload CV**: Users can upload their CV in various formats (PDF, DOCX, or plain text)
2. **Input Job Details**: Users enter job requirements and responsibilities
3. **AI Analysis**: The application uses advanced AI models to:
   - Extract key information from the CV (skills, experience, education, etc.)
   - Parse job requirements and responsibilities
   - Compare the CV with job requirements semantically
   - Generate a matching score and detailed analysis
4. **Results**: Users receive:
   - Overall matching score (percentage)
   - Breakdown of matching skills and experience
   - Identification of missing requirements
   - Suggestions for improving the CV for the specific job

## For Companies

The CV-Job Matching AI offers powerful features specifically designed for companies and recruiters:

- **Bulk CV Processing**: Upload and analyze multiple CVs simultaneously
- **Candidate Ranking**: Sort candidates based on matching scores
- **Custom Evaluation Criteria**: Tailor the matching algorithm to your specific needs
- **Team Collaboration**: Enable multiple team members to participate in the recruitment process
- **ATS Integration**: Connect with your existing Applicant Tracking System
- **Analytics Dashboard**: Gain insights into your recruitment process

For detailed information on company features, see our [Company Guide](docs/05-for-companies.md).

## Model Providers

This application ships with OpenAI `gpt-4o` as the default model for CV-Job matching. However, with the [AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), and [many more](https://sdk.vercel.ai/providers/ai-sdk-providers) with just a few lines of code.

For optimal CV-Job matching performance, we recommend using models with strong reasoning capabilities and document understanding, such as GPT-4o or Claude 3.5 Sonnet.

## Deploy Your Own

You can deploy your own version of the CV-Job Matching AI to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot&env=AUTH_SECRET,OPENAI_API_KEY&envDescription=Learn%20more%20about%20how%20to%20get%20the%20API%20Keys%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot%2Fblob%2Fmain%2F.env.example&demo-title=CV-Job%20Matching%20AI&demo-description=An%20AI-powered%20tool%20for%20matching%20CVs%20with%20job%20requirements%20and%20providing%20detailed%20analysis.&demo-url=https%3A%2F%2Fchat.vercel.ai&stores=[{%22type%22:%22blob%22}])

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run CV-Job Matching AI. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your CV-Job Matching AI should now be running on [localhost:3000](http://localhost:3000/).
