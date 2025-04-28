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
        'flex items-start gap-2.5',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {message.role === 'assistant' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
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
          'relative max-w-[85%] rounded-xl shadow-sm p-3',
          message.role === 'user'
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : 'bg-white border-2 border-primary/20 rounded-tl-none'
        )}
      >
        <div
          className={cn(
            'text-sm leading-relaxed prose prose-sm max-w-none',
            message.role === 'assistant'
              ? 'text-foreground prose-headings:text-foreground prose-a:text-primary prose-p:my-1 prose-ul:my-1 prose-li:my-0.5'
              : 'text-primary-foreground prose-headings:text-primary-foreground prose-a:text-primary-foreground/90 prose-a:underline prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-code:text-white/90 prose-code:bg-primary-foreground/20 prose-code:px-1 prose-code:rounded'
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <time
          className={cn(
            'text-xs mt-1.5 block text-right',
            message.role === 'user'
              ? 'text-primary-foreground/90'
              : 'text-muted-foreground/90'
          )}
        >
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>
      {message.role === 'user' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
