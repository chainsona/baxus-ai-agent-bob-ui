import { ScrollArea } from '@/components/ui/scroll-area';
import { forwardRef } from 'react';
import { Message } from './types';
import { MessageBubble } from './message-bubble';
import { LoadingIndicator } from './loading-indicator';

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessagesList = forwardRef<
  HTMLDivElement | null,
  MessagesListProps
>(({ messages, isLoading }, ref) => {
  return (
    <ScrollArea
      className="flex-1 p-4"
      style={{ backgroundColor: '#F8F6F1' }}
      ref={ref}
    >
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <LoadingIndicator />}
      </div>
    </ScrollArea>
  );
});

MessagesList.displayName = 'MessagesList';
