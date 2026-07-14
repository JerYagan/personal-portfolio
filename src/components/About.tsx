import { SectionHeading } from './SectionHeading';
import { getProfile } from '../services/contentService';
import { LinkButton } from './Button';

const facts: [string, string][] = [
  ['12+', 'Projects shipped'],
  ['15+', 'Technologies'],
  ['02', 'Internships'],
  ['2026', 'BSIT graduate'],
];

export function About() {
  const profile = getProfile();

  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
      <SectionHeading eyebrow="01 / ABOUT" title="A considered approach to building." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
        {/* Profile image */}
        <div className="overflow-hidden rounded-panel border border-line bg-card">
          <img
            className="aspect-[4/5] h-full w-full object-cover grayscale"
            src={profile.portraitUrl}
            alt={`Portrait of ${profile.name}`}
          />
        </div>

        {/* Bio & stats */}
        <div>
          <p className="max-w-2xl text-xl leading-8 tracking-[-0.025em] text-zinc-300">
            {profile.aboutIntro}
          </p>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted">
            {profile.aboutSub}
          </p>

          {/* Stats grid */}
          <div className="mt-9 border-t border-l border-line sm:grid sm:grid-cols-2">
            {facts.map(([value, label]) => (
              <div key={label} className="border-r border-b border-line px-5 py-5">
                <div className="text-2xl font-semibold tracking-[-.04em]">{value}</div>
                <div className="mt-1 text-xs text-muted">{label}</div>
              </div>
            ))}
          </div>

          {/* Current focus card & Links */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 rounded-panel border border-line bg-surface p-5">
              <p className="font-mono text-[10px] tracking-[.15em] text-muted">CURRENT FOCUS</p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {profile.currentFocusDetails}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
              <LinkButton href={profile.resumeUrl} variant="secondary" target="_blank" rel="noopener noreferrer" className="w-fit text-xs py-2 px-3">
                Download résumé <span className="text-muted">↓</span>
              </LinkButton>
              <div className="flex gap-4 text-xs font-mono text-muted">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                  GitHub ↗
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
