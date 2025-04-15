'use client';

import type {
  Attachment,
  ChatRequestOptions,
  Message,
} from 'ai';
import cx from 'classnames';
import type React from 'react';
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  memo,
} from 'react';
import { toast } from 'sonner';
import { useLocalStorage, useWindowSize } from 'usehooks-ts';
import { motion, AnimatePresence } from 'framer-motion';

import { sanitizeUIMessages } from '@/lib/utils';

import { ArrowUpIcon, PaperclipIcon, StopIcon } from './icons';
import { PreviewAttachment } from './preview-attachment';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { SuggestedActions } from './suggested-actions';
import equal from 'fast-deep-equal';
import type { UseChatHelpers, } from '@ai-sdk/react';

function PureMultimodalInput({
  chatId,
  input,
  setInput,
  status,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
}: {
  chatId: string;
  input: UseChatHelpers['input'];
  setInput: UseChatHelpers['setInput'];
  status: UseChatHelpers['status'];
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  append: UseChatHelpers['append'];
  handleSubmit: (event?: { preventDefault?: () => void } | React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '98px';
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    'input',
    '',
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || '';
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  const submitForm = useCallback(() => {
    window.history.replaceState({}, '', `/chat/${chatId}`);

    if (input.trim() || attachments.length > 0) {
      handleSubmit(undefined, {
        experimental_attachments: attachments,
      });

      setAttachments([]);
      setLocalStorageInput('');
      resetHeight();

      if (width && width > 768) {
        textareaRef.current?.focus();
      }
    }
  }, [
    input,
    attachments,
    handleSubmit,
    setAttachments,
    setLocalStorageInput,
    width,
    chatId,
  ]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;

        return {
          url,
          name: pathname,
          contentType: contentType,
        };
      }
      const { error } = await response.json();
      toast.error(error);
    } catch (error) {
      toast.error('Failed to upload file, please try again!');
    }
  };

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      setUploadQueue(files.map((file) => file.name));

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined,
        );

        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);
      } catch (error) {
        console.error('Error uploading files!', error);
      } finally {
        setUploadQueue([]);
      }
    },
    [setAttachments],
  );

  return (
    <motion.div
      className="relative w-full flex flex-col gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {messages.length === 0 &&
          attachments.length === 0 &&
          uploadQueue.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <SuggestedActions append={append} chatId={chatId} />
            </motion.div>
          )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple
      />

      <motion.div
        className="relative flex flex-col w-full shadow-sm bg-background border border-border rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <AnimatePresence>
          {(attachments.length > 0 || uploadQueue.length > 0) && (
            <motion.div
              className="flex flex-wrap gap-2 p-2 border-b border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {uploadQueue.map((fileName) => (
                <div
                  key={fileName}
                  className="max-w-[200px] flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded truncate"
                >
                  <div className="size-3 rounded-full bg-primary/30 animate-pulse" />
                  <span className="truncate">{fileName}</span>
                </div>
              ))}
              {attachments.map((attachment) => (
                <div key={attachment.url} className="flex items-center gap-1">
                  <PreviewAttachment attachment={attachment} />
                  <Button
                    className="p-0 size-4 text-muted-foreground"
                    variant="ghost"
                    onClick={() => {
                      setAttachments((currentAttachments) =>
                        currentAttachments.filter(
                          (currentAttachment) =>
                            currentAttachment.url !== attachment.url,
                        ),
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-3"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </Button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end">
          <Textarea
            ref={textareaRef}
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                !e.shiftKey &&
                e.key === 'Enter' &&
                status !== 'streaming'
              ) {
                e.preventDefault();
                submitForm();
              }
            }}
            placeholder="Message..."
            className="min-h-[48px] border-0 shadow-none resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-3 text-base"
            value={input}
            onChange={handleInput}
            disabled={status === 'streaming'}
            rows={1}
          />

          <div className="flex p-1 items-end gap-1">
            <AnimatePresence>
              {status !== 'streaming' ? (
                <>
                  <AttachmentsButton
                    fileInputRef={fileInputRef}
                    status={status}
                  />
                  <SendButton
                    submitForm={submitForm}
                    input={input}
                    uploadQueue={uploadQueue}
                  />
                </>
              ) : (
                <StopButton stop={stop} setMessages={setMessages} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AttachmentsButton({
  fileInputRef,
  status,
}: {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  status: UseChatHelpers['status'];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
    >
      <Button
        disabled={status === 'streaming'}
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => fileInputRef.current?.click()}
      >
        <PaperclipIcon size={20} />
      </Button>
    </motion.div>
  );
}

function StopButton({
  stop,
  setMessages,
}: {
  stop: () => void;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500"
        onClick={() => {
          stop();
          setMessages((messages) => sanitizeUIMessages(messages));
        }}
      >
        <StopIcon size={16} />
      </Button>
    </motion.div>
  );
}

function SendButton({
  submitForm,
  input,
  uploadQueue,
}: {
  submitForm: () => void;
  input: string;
  uploadQueue: Array<string>;
}) {
  const isDisabled = !input.trim() && uploadQueue.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
    >
      <Button
        disabled={isDisabled}
        variant="ghost"
        size="icon"
        className={cx(
          'rounded-full',
          !isDisabled
            ? 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
            : '',
        )}
        onClick={submitForm}
      >
        <ArrowUpIcon size={16} />
      </Button>
    </motion.div>
  );
}

export const MultimodalInput = memo(PureMultimodalInput, (prevProps, nextProps) => {
  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.input !== nextProps.input) return false;
  if (!equal(prevProps.attachments, nextProps.attachments)) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;

  return true;
});
