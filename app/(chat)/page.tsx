import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';

import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { ChatWithCVUpload } from '@/components/chat-with-cv-upload';

export default async function Page() {
  const id = randomUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');
  const selectedModel = modelIdFromCookie ? modelIdFromCookie.value : DEFAULT_CHAT_MODEL;

  return (
    <ChatWithCVUpload
      id={id}
    />
  );
}
