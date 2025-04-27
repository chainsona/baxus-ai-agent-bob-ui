import { Badge } from '@/components/ui/badge';

export type RecommendationBadgeType = 'top-pick' | 'similar' | 'diverse';

interface RecommendationBadgeProps {
  type: RecommendationBadgeType;
  children: React.ReactNode;
}

export function RecommendationBadge({
  type,
  children,
}: RecommendationBadgeProps) {
  const styles = {
    'top-pick':
      'bg-gradient-to-r from-[#1D6D72]/90 via-[#1D6D72] to-[#1D6D72]/90 text-white shadow-sm',
    similar: 'bg-[#1D6D72] text-white',
    diverse: 'bg-gradient-to-r from-[#7E3192] to-[#3066BE] text-white',
  };

  return (
    <Badge
      className={`${styles[type]} text-xs px-3 py-1 border border-[#1D6D72]/20 font-medium`}
    >
      {type === 'top-pick' && (
        <span className="relative z-10 mix-blend-overlay mr-1">✦</span>
      )}
      {children}
    </Badge>
  );
}
