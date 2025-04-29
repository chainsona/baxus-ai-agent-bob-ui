import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import { ChatBody } from './chat-body';
import { Message } from './types';
import React from 'react';

interface DesktopChatProps {
  isOpen: boolean;
  toggleChat: () => void;
  messages: Message[];
  input: string;
  isLoading: boolean;
  username?: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  clearConversation?: () => void;
}

export function DesktopChat({
  isOpen,
  toggleChat,
  messages,
  input,
  isLoading,
  username,
  onInputChange,
  onSubmit,
  scrollAreaRef,
  clearConversation,
}: DesktopChatProps) {
  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        variant="default"
        className={cn(
          'fixed bottom-6 right-6 z-50 rounded-full h-16 w-16 shadow-lg text-white flex items-center justify-center',
          isOpen && 'hidden'
        )}
        style={{ backgroundColor: '#1D6D72' }}
        aria-label="Open Chat"
      >
        <MessageCircle className="h-10 w-10" />
      </Button>

      {/* Chat Panel */}
      <div
        className={cn(
          'fixed bottom-0 right-0 z-50 flex flex-col w-80 sm:w-96 h-screen max-h-[90vh] shadow-lg transition-all duration-300 ease-in-out rounded-t-lg overflow-hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ backgroundColor: '#F8F6F1' }}
      >
        <ChatBody
          messages={messages}
          input={input}
          isLoading={isLoading}
          username={username}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onClose={toggleChat}
          scrollAreaRef={scrollAreaRef}
          clearConversation={clearConversation}
        />
      </div>
    </>
  );
}
