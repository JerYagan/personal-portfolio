import { SectionHeading } from './SectionHeading';
import { Tag } from './Tag';
import { getExperience, getSkills } from '../services/contentService';

export function Experience() {
  const { roles } = getExperience();
  const { categories } = getSkills();

  return (
    <section id="experience" className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
      <SectionHeading
        eyebrow="03 / EXPERIENCE"
        title="Progress over prestige."
        description="A growing record of delivering thoughtful outcomes with talented teams."
      />

      <div className="mt-12 grid gap-16 lg:grid-cols-[1.25fr_.75fr]">
        {/* Timeline */}
        <div className="relative border-l border-line">
          {roles.map((r, i) => (
            <article key={r.company} className="relative pb-11 pl-7 last:pb-0">
              <span
                className={`absolute -left-[5px] top-1 size-2.5 rounded-full border-2 border-background ${
                  i === 0 ? 'bg-brand' : 'bg-zinc-600'
                }`}
              />
              <p className="font-mono text-[10px] tracking-[.12em] text-muted">{r.period}</p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-[-.03em]">{r.role}</h3>
                <span className="text-sm text-zinc-400">{r.company}</span>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{r.text}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.tech && r.tech.map((t) => (
                  <Tag key={t} className="bg-surface">{t}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Capabilities */}
        <div>
          <p className="font-mono text-[11px] tracking-[.15em] text-muted">CAPABILITIES</p>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {categories.map((c) => (
              <div className="py-4" key={c.title}>
                <h3 className="text-sm font-medium">{c.title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted">{c.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
