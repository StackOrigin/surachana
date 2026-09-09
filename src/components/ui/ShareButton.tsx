import { useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

export default function ShareButton({ title, text, className = '' }: { title: string; text?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = () => window.location.href;

  const handleShare = async () => {
    const url = shareUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title, text: text ?? title, url });
        return;
      } catch {
        return; // user dismissed — no fallback noise
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <button type="button" onClick={handleShare} className={`share-btn ${className}`.trim()} aria-label={`Share: ${title}`}>
      {copied ? <Check className="share-btn__icon" /> : <Share2 className="share-btn__icon" />}
      <span>{copied ? 'Link copied' : 'Share'}</span>
      {!copied && <Link2 className="share-btn__icon share-btn__icon--small" aria-hidden="true" />}
    </button>
  );
}
