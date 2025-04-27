import { ArrowRight } from 'lucide-react';

interface ReasonPointsProps {
  points: string[];
  variant?: 'default' | 'diverse';
}

export function ReasonPoints({
  points,
  variant = 'default',
}: ReasonPointsProps) {
  if (!points.length) return null;

  const textColor = variant === 'diverse' ? 'text-[#7E3192]' : 'text-[#1D6D72]';
  const borderColor =
    variant === 'diverse' ? 'border-[#7E3192]/20' : 'border-[#1D6D72]/20';

  return (
    <div className={`border ${borderColor} rounded bg-white p-3 mt-2`}>
      <h5 className={`text-sm font-medium ${textColor} mb-2`}>
        {variant === 'diverse' ? 'Try Something Different' : 'Why Recommended'}
      </h5>
      <ul className="space-y-1.5">
        {points.slice(0, 3).map((point, index) => (
          <li key={index} className="flex items-start text-xs text-[#222222]">
            <ArrowRight
              className={`h-3 w-3 ${textColor} mr-1 mt-0.5 shrink-0`}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
