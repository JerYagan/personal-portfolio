import { Link } from 'react-router-dom';
import { SectionHeading } from './SectionHeading';
import { Tag } from './Tag';
import { getProjects } from '../services/contentService';
import { LinkButton } from './Button';

export function Projects() {
  // Show only 3 showcase projects on the homepage
  const showcaseProjects = getProjects().slice(0, 3);

  return (
    <section id="projects" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="02 / SELECTED WORK"
          title="Useful work, made with care."
          description="A selection of product work across strategy, interface systems, and full-stack implementation."
          action={
            <Link to="/projects" className="hidden text-sm text-brand hover:underline md:block font-mono tracking-wider">
              VIEW ALL PROJECTS <span className="text-xs">↗</span>
            </Link>
          }
        />

        {/* Project showcase grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {showcaseProjects.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col h-full overflow-hidden rounded-panel border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-zinc-600"
            >
              {/* Image */}
              <div className="relative aspect-[1.55] overflow-hidden bg-zinc-800">
                <img
                  src={p.image}
                  alt={`${p.title} project preview`}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 grayscale transition duration-500 group-hover:scale-[1.035] group-hover:grayscale-0"
                />
                {p.featured && (
                  <span className="absolute left-3 top-3 rounded-md border border-white/20 bg-black/50 px-2 py-1 font-mono text-[9px] tracking-[.13em] text-white">
                    FEATURED
                  </span>
                )}
              </div>
              {/* Content */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] tracking-[.12em] text-muted">
                        {p.type.toUpperCase()} · {p.year}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold tracking-[-.03em]">{p.title}</h3>
                    </div>
                    <span className="text-muted transition group-hover:text-brand">↗</span>
                  </div>
                  {/* Description container with fixed height and line clamping */}
                  <div className="mt-3 h-20 overflow-hidden">
                    <p className="text-sm leading-6 text-muted line-clamp-3">{p.description}</p>
                  </div>
                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
                {/* Footer links */}
                <div className="mt-5 flex gap-4 border-t border-line pt-4 text-xs font-medium">
                  <Link to={`/projects/${p.slug}`} className="hover:text-brand">
                    Case study ↗
                  </Link>
                  {p.github ? (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                      GitHub ↗
                    </a>
                  ) : (
                    <span className="text-zinc-600">No Repo</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Projects Button - Mobile Fallback & Center Call To Action */}
        <div className="mt-12 flex justify-center">
          <LinkButton href="/projects" variant="secondary">
            View all projects <span className="ml-1">↗</span>
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
