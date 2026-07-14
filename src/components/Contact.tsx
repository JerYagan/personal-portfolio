import { useState } from 'react';
import { getProfile } from '../services/contentService';
import { Button } from './Button';

export function Contact() {
  const profile = getProfile();
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API/Formspree integration
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[760px] px-6 py-24 text-center sm:px-8 lg:py-32">
        <p className="font-mono text-[11px] tracking-[.16em] text-brand">04 / CONTACT</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
          Let's build something that lasts.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-7 text-muted">
          Have a product challenge, an interesting team, or a project that needs careful attention? I'd like to hear about it.
        </p>

        {success ? (
          <div className="mx-auto mt-10 max-w-[560px] rounded-panel border border-brand/20 bg-brand/5 p-6 text-center">
            <span className="text-2xl">✨</span>
            <h3 className="mt-2 text-base font-medium text-ink">Message received!</h3>
            <p className="mt-2 text-sm text-muted">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-10 grid max-w-[560px] gap-3 text-left sm:grid-cols-2">
            <label className="text-xs text-muted">
              Name
              <input
                required
                placeholder="Your name"
                className="mt-2 w-full rounded-lg border border-line bg-background px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand"
              />
            </label>
            <label className="text-xs text-muted">
              Email
              <input
                required
                type="email"
                placeholder="you@company.com"
                className="mt-2 w-full rounded-lg border border-line bg-background px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand"
              />
            </label>
            <label className="text-xs text-muted sm:col-span-2">
              Project details
              <textarea
                required
                rows={4}
                placeholder="A little about what you're working on..."
                className="mt-2 w-full resize-none rounded-lg border border-line bg-background px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand"
              />
            </label>
            <Button
              type="submit"
              disabled={sending}
              variant="primary"
              className="mt-2 w-fit sm:col-span-2 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send message'} <span>↗</span>
            </Button>
          </form>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted">
          <button
            onClick={handleCopyEmail}
            className="hover:text-ink transition-colors font-medium border-b border-dashed border-zinc-700 pb-0.5"
            aria-label="Copy email address"
          >
            {copied ? 'Copied! ✓' : 'Copy Email'}
          </button>
          <a className="hover:text-ink" href={`mailto:${profile.email}`}>
            Email
          </a>
          <a className="hover:text-ink" href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a className="hover:text-ink" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a className="hover:text-ink" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
        </div>
      </div>
    </section>
  );
}
