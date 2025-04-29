import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Message } from './types';
import Image from 'next/image';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-1.5 md:gap-2.5',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {message.role === 'assistant' && (
        <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          <Image
            src="/bob-avatar.png"
            alt="BOB Avatar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div
        className={cn(
          'relative max-w-[80%] rounded-xl shadow-sm p-2 md:p-3',
          message.role === 'user'
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : 'bg-white border border-primary/20 rounded-tl-none'
        )}
      >
        <div
          className={cn(
            'text-xs md:text-sm leading-relaxed prose prose-sm max-w-none',
            message.role === 'assistant'
              ? 'text-foreground prose-headings:text-foreground prose-a:text-primary prose-p:my-1 prose-ul:my-1 prose-li:my-0.5'
              : 'text-primary-foreground prose-headings:text-primary-foreground prose-a:text-primary-foreground/90 prose-a:underline prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-code:text-white/90 prose-code:bg-primary-foreground/20 prose-code:px-1 prose-code:rounded'
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <time
          className={cn(
            'text-[10px] md:text-xs mt-1 block text-right',
            message.role === 'user'
              ? 'text-primary-foreground/80'
              : 'text-muted-foreground/80'
          )}
        >
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>
      {message.role === 'user' && (
        <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-3 w-3 md:h-4 md:w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
