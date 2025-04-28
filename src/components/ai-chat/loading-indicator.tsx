import { Bot } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Bot className="h-4 w-4 text-primary" />
      </div>
      <div className="bg-white border-2 border-primary/20 relative max-w-[85%] rounded-xl rounded-tl-none shadow-sm p-3">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div
              className="h-2 w-2 rounded-full bg-primary/40 animate-pulse"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-primary/60 animate-pulse"
              style={{ animationDelay: '300ms' }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-primary/80 animate-pulse"
              style={{ animationDelay: '600ms' }}
            ></div>
          </div>
          <p className="text-sm font-medium text-primary/80">Thinking...</p>
        </div>
      </div>
    </div>
  );
}
