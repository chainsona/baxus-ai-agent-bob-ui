import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ActionButtonProps {
  url?: string;
  variant?: 'default' | 'diverse';
  hasPrice?: boolean;
}

export function ActionButton({
  url,
  variant = 'default',
  hasPrice = false,
}: ActionButtonProps) {
  if (!url) return null;

  const textColor = variant === 'diverse' ? 'text-[#7E3192]' : 'text-[#1D6D72]';
  const borderColor =
    variant === 'diverse' ? 'border-[#7E3192]/20' : 'border-[#1D6D72]/20';
  const hoverBg =
    variant === 'diverse' ? 'hover:bg-[#7E3192]/10' : 'hover:bg-[#1D6D72]/10';

  return (
    <Button
      variant="outline"
      size="sm"
      className={`${textColor} ${borderColor} ${hoverBg}`}
      asChild
    >
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <span className="flex items-center justify-center">
          {hasPrice ? 'View listing' : 'View Asset'}
          <ExternalLink className="ml-1 h-3 w-3" />
        </span>
      </Link>
    </Button>
  );
}
