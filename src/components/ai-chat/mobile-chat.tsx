import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MessageCircle } from 'lucide-react';
import { ChatBody } from './chat-body';
import { Message } from './types';
import React from 'react';

interface MobileChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  messages: Message[];
  input: string;
  isLoading: boolean;
  username?: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
}

export function MobileChat({
  isOpen,
  setIsOpen,
  messages,
  input,
  isLoading,
  username,
  onInputChange,
  onSubmit,
  scrollAreaRef,
}: MobileChatProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 z-50 rounded-full h-16 w-16 shadow-lg text-white flex items-center justify-center"
          style={{ backgroundColor: '#1D6D72' }}
          aria-label="Open Chat"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="border-t border-border rounded-t-2xl p-0 h-[90vh] flex flex-col"
        style={{ backgroundColor: '#F8F6F1' }}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>BOB Chat</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <ChatBody
            messages={messages}
            input={input}
            isLoading={isLoading}
            username={username}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            scrollAreaRef={scrollAreaRef}
            showCloseButton={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
