import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ChatHeaderProps {
  username?: string | null;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function ChatHeader({
  username,
  onClose,
  showCloseButton = true,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <Image
            src="/bob-avatar.png"
            alt="BOB Avatar"
            width={24}
            height={24}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-medium text-foreground">Chat with BOB</h3>
        {username && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
            @{username}
          </span>
        )}
      </div>
      {showCloseButton && onClose && (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-neutral-500 hover:bg-neutral-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
