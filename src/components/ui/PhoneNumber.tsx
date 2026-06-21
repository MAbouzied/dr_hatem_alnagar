import { site, telUrl } from '../../content/site';
import { type ClickLocation, trackPhoneCallClick } from '../../lib/tracking';

const ltrClasses =
  'inline-block whitespace-nowrap font-sans [direction:ltr] [unicode-bidi:isolate]';

interface PhoneNumberProps {
  className?: string;
  as?: 'span' | 'a';
  trackingLocation?: ClickLocation;
}

export function PhoneNumber({ className = '', as = 'span', trackingLocation }: PhoneNumberProps) {
  const classes = `${ltrClasses} ${className}`.trim();

  if (as === 'a') {
    return (
      <a
        href={telUrl}
        className={classes}
        dir="ltr"
        onClick={
          trackingLocation
            ? () => trackPhoneCallClick(trackingLocation, telUrl)
            : undefined
        }
      >
        {site.phoneDisplay}
      </a>
    );
  }

  return (
    <span className={classes} dir="ltr">
      {site.phoneDisplay}
    </span>
  );
}
