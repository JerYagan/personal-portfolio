import { LinkButton } from './Button';
import { getProfile } from '../services/contentService';

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
      <path d="M3 13 13 3M6 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero() {
  const profile = getProfile();

  // Split title if it contains "clarity" to keep design reference format
  const titleText = profile.bioShort;
  const hasClarity = titleText.toLowerCase().includes('clarity');
  const renderedTitle = hasClarity ? (
    <>
      {titleText.substring(0, titleText.toLowerCase().indexOf('clarity'))}
      <span className="text-zinc-500">clarity.</span>
    </>
  ) : (
    titleText
  );

  return (
    <section id="home" className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 py-22 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-20 lg:px-10 lg:py-32">
        {/* Left column — copy */}
        <div>
          <div className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-muted">
            <span className="size-2 rounded-full bg-green-500" />
            {profile.availability.toUpperCase()}
          </div>
          <h1 className="max-w-3xl text-[3.25rem] font-bold leading-[.98] tracking-[-0.065em] text-ink sm:text-7xl lg:text-[5.4rem]">
            {renderedTitle}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
            {profile.bioDescription}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="#projects" variant="primary">
              View projects <ArrowUpRight />
            </LinkButton>
            <LinkButton href={profile.resumeUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
              Download résumé <span className="text-muted">↓</span>
            </LinkButton>
          </div>
        </div>

        {/* Right column — terminal card */}
        <div className="relative mx-auto w-full max-w-[480px] rounded-panel border border-line bg-surface p-4 shadow-[0_18px_50px_rgba(0,0,0,.18)]">
          <div className="rounded-lg border border-line bg-background p-5 sm:p-7">
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-line pb-5">
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-zinc-700" />
                <span className="size-2 rounded-full bg-zinc-700" />
                <span className="size-2 rounded-full bg-zinc-700" />
              </div>
              <span className="font-mono text-[10px] tracking-[.14em] text-muted">SYSTEM.STATUS</span>
            </div>
            {/* Code block */}
            <pre className="mt-6 overflow-hidden font-mono text-[11px] leading-6 text-zinc-400 sm:text-xs">
              <code>
                <span className="text-brand-blue">const</span> developer = {'{'}
{`\n`}  name: <span className="text-ink">"{profile.name}"</span>,
{`\n`}  focus: [{profile.focus.map(f => `"${f}"`).join(', ')}],
{`\n`}  principle: <span className="text-ink">"{profile.principle}"</span>,
{`\n`}  shipping: <span className="text-green-400">true</span>
{`\n`}{'}'};
              </code>
            </pre>
            {/* Footer */}
            <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
              <span className="font-mono text-[10px] text-muted">// CURRENTLY BUILDING</span>
              <span className="text-xs font-medium">{profile.currentlyBuilding} <span className="text-brand">↗</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
