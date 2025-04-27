import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface MetricBadgeProps {
  type: 'price' | 'proof' | 'abv' | 'age' | 'size';
  label: string;
  value: string | number;
  variant?: 'default' | 'diverse';
  listingUrl?: string;
}

export function MetricBadge({
  type,
  value,
  variant = 'default',
  listingUrl,
}: MetricBadgeProps) {
  // Skip rendering for price when value is falsy
  if (type === 'price' && !value) return null;

  const textColor = variant === 'diverse' ? 'text-[#7E3192]' : 'text-[#1D6D72]';
  const iconColor = variant === 'diverse' ? 'text-[#7E3192]' : 'text-[#1D6D72]';

  return (
    <div className="bg-white px-3 py-1 rounded-md border border-[#1D6D72]/10 group hover:border-[#1D6D72]/20 hover:shadow-sm transition-all">
      {type === 'price' && listingUrl ? (
        <div className="flex items-center">
          <span className={`font-medium text-sm ${textColor}`}>${value}</span>
          <Link href={listingUrl} target="_blank" rel="noopener noreferrer">
            <span className="ml-1 flex items-center">
              <ExternalLink className={`h-3 w-3 ${iconColor}`} />
            </span>
          </Link>
        </div>
      ) : (
        <span className={`font-medium text-sm ${textColor}`}>
          {type === 'price' && '$'}
          {value}
          {type === 'abv' && '% ABV'}
          {type === 'proof' && ' Proof'}
          {type === 'age' && ` Year${value !== 1 ? 's' : ''}`}
          {type === 'size' && 'ml'}
        </span>
      )}
    </div>
  );
}
