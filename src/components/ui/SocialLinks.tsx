import type { ComponentType, SVGProps } from 'react';
import { SCHOOL } from '../../data/schoolData';
import { useSchoolData } from '../../hooks/useSchoolData';

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.2v3h2.5v7h2.8Z" />
    </svg>
  );
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.5 3c.3 2 1.5 3.4 3.7 3.6v3c-1.4 0-2.7-.5-3.7-1.2v6.3c0 3.4-2.5 5.8-5.7 5.8A5.4 5.4 0 0 1 4.2 15c0-3.1 2.4-5.4 5.6-5.4.3 0 .7 0 1 .1v3.1a2.5 2.5 0 0 0-1-.2 2.4 2.4 0 0 0-2.5 2.4 2.4 2.4 0 0 0 2.5 2.4c1.5 0 2.6-1.1 2.6-2.8V3h3.1Z" />
    </svg>
  );
}

export type SocialNetwork = 'facebook' | 'tiktok';
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const SOCIAL_META: { key: SocialNetwork; name: string; Icon: IconComponent }[] = [
  { key: 'facebook', name: 'Facebook', Icon: FacebookIcon },
  { key: 'tiktok', name: 'TikTok', Icon: TikTokIcon },
];

export function getSocialLinks(): { key: string; name: string; href: string; Icon: IconComponent }[] {
  return SOCIAL_META.filter((item) => Boolean(SCHOOL.social[item.key])).map((item) => ({
    ...item,
    href: SCHOOL.social[item.key],
  }));
}

export default function SocialLinks({ variant = 'dark', className = '' }: { variant?: 'dark' | 'light'; className?: string }) {
  useSchoolData();
  const links = getSocialLinks();
  if (!links.length) return null;
  return (
    <div className={`social-links social-links--${variant} ${className}`.trim()}>
      {links.map(({ key, name, href, Icon }) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="social-links__link" aria-label={`${name} — Surachana English School`}>
          <span className="social-links__icon" aria-hidden="true">
            <Icon />
          </span>
          <span className="social-links__name">{name}</span>
        </a>
      ))}
    </div>
  );
}
