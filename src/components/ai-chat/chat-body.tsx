import React from 'react';
import { Message } from './types';
import { ChatHeader } from './chat-header';
import { MessagesList } from './messages-list';
import { ChatInput } from './chat-input';

interface ChatBodyProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  username?: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  clearConversation?: () => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export function ChatBody({
  messages,
  input,
  isLoading,
  username,
  onInputChange,
  onSubmit,
  onClose,
  showCloseButton,
  scrollAreaRef,
  clearConversation,
  inputRef,
}: ChatBodyProps) {
  return (
    <>
      <ChatHeader
        username={username}
        onClose={onClose}
        showCloseButton={showCloseButton}
        clearConversation={clearConversation}
      />

      <MessagesList
        messages={messages}
        isLoading={isLoading}
        ref={scrollAreaRef}
      />

      <ChatInput
        ref={inputRef}
        input={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
}
