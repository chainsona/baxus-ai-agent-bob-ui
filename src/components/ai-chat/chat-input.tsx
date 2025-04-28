import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import React from 'react';

interface ChatInputProps {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  onChange,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="p-4 border-t border-primary/20 bg-white">
      <form onSubmit={onSubmit} className="relative">
        <Textarea
          value={input}
          onChange={onChange}
          placeholder="Type your message..."
          className="resize-none pr-10 min-h-[60px] border-primary/30 focus:border-primary focus:ring-primary bg-white rounded-md"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (input.trim()) {
                onSubmit(e);
              }
            }
          }}
        />
        <Button
          type="submit"
          variant="default"
          size="icon"
          className="absolute right-2 bottom-2 h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!input.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
