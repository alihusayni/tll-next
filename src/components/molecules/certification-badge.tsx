import BadgeIcon from '../atoms/badge-icon';

export default function CertificationBadge() {
  return (
    <div className="grid grid-cols-3 gap-[1.625rem] justify-items-center lg:justify-items-start">
      <BadgeIcon
        src="/assets/certifications/logo-1.svg"
        alt="Logo of professional legal certification organization"
        width={90}
        height={90}
      />
      <BadgeIcon
        src="/assets/certifications/logo-2.svg"
        alt="Logo of professional legal certification organization"
        width={90}
        height={90}
      />
      <BadgeIcon
        src="/assets/certifications/logo-3.svg"
        alt="Logo of professional legal certification organization"
        width={90}
        height={89}
      />
    </div>
  );
}