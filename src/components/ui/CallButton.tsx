import { telUrl } from '../../content/site';
import { type ClickLocation } from '../../lib/tracking';
import { Button } from './Button';

type CallButtonSize = 'sm' | 'md' | 'lg';

interface CallButtonProps {
  size?: CallButtonSize;
  className?: string;
  /** `dark` = hero / navy sections; `light` = white / tinted sections */
  theme?: 'dark' | 'light';
  fullWidth?: boolean;
  trackingLocation?: ClickLocation;
}

const darkCallClasses =
  'border-white/10 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 shadow-md';

export function CallButton({
  size = 'lg',
  className = '',
  theme = 'light',
  fullWidth = false,
  trackingLocation,
}: CallButtonProps) {
  const widthClass = fullWidth ? 'w-full' : '';

  if (theme === 'dark') {
    return (
      <Button
        href={telUrl}
        variant="secondary"
        size={size}
        trackingLocation={trackingLocation}
        className={`${darkCallClasses} ${widthClass} ${className}`.trim()}
      >
        اتصال مباشر
      </Button>
    );
  }

  return (
    <Button
      href={telUrl}
      variant="secondary"
      size={size}
      trackingLocation={trackingLocation}
      className={`${widthClass} ${className}`.trim()}
    >
      اتصال مباشر
    </Button>
  );
}
