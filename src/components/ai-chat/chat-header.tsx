import { Button } from '@/components/ui/button';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface ChatHeaderProps {
  username?: string | null;
  onClose?: () => void;
  showCloseButton?: boolean;
  clearConversation?: () => void;
}

export function ChatHeader({
  username,
  onClose,
  showCloseButton = true,
  clearConversation,
}: ChatHeaderProps) {
  return (
    <div className="bg-[#1D6D72] border-b border-[#1D6D72]/20">
      {/* Top row - Title and close button */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-white/90">
            <Image
              src="/bob-avatar.png"
              alt="BOB Avatar"
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-medium text-sm text-white whitespace-nowrap">
            Chat with BOB
          </h3>
        </div>

        {/* Close button */}
        {showCloseButton && onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Bottom row - Username and clear button */}
      <div className="flex items-center justify-between px-3 pb-2">
        {/* Username and clear button */}
        <div className="flex items-center gap-2">
          {username && (
            <span className="px-1.5 py-0.5 text-xs bg-white/20 text-white rounded-full truncate max-w-[200px]">
              @{username}
            </span>
          )}

          {/* Clear button */}
          {clearConversation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearConversation}
              className="h-6 w-6 p-0 text-white hover:bg-white/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Empty div to maintain layout */}
        <div></div>
      </div>
    </div>
  );
}
