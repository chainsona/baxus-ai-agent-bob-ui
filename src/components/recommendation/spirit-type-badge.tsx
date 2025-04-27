import { Badge } from '@/components/ui/badge';

interface SpiritTypeBadgeProps {
  type: string;
  variant?: 'default' | 'diverse';
}

export function SpiritTypeBadge({
  type,
  variant = 'default',
}: SpiritTypeBadgeProps) {
  const bgColor =
    variant === 'diverse'
      ? 'bg-white/90 text-[#7E3192] border-[#7E3192]/10'
      : 'bg-white/90 text-[#1D6D72] border-[#1D6D72]/10';

  return (
    <Badge
      variant="outline"
      className={`${bgColor} hover:bg-white text-xs px-2.5 py-0.5`}
    >
      {type || 'Spirits'}
    </Badge>
  );
}
