import { Button } from '@/components/ui/button';
import { X, Trash2, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    <div className="bg-primary border-b border-primary/20">
      {/* Main header row */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-1.5 overflow-hidden max-w-[70%]">
          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-white/90">
            <Image
              src="/bob-avatar.png"
              alt="BOB Avatar"
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-medium text-sm text-primary-foreground whitespace-nowrap">
            Chat with BOB
          </h3>
          {username && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 text-primary-foreground rounded-full truncate max-w-[100px]">
              @{username}
            </span>
          )}
        </div>

        {/* Actions container */}
        <div className="flex items-center gap-1.5">
          {/* Menu with clear option */}
          {clearConversation && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 bg-card border border-border shadow-md"
              >
                <DropdownMenuItem
                  onClick={clearConversation}
                  className="cursor-pointer text-destructive hover:text-destructive focus:text-destructive hover:bg-muted"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Close button */}
          {showCloseButton && onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-7 w-7 p-0 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
