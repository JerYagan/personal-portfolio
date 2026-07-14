import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from './SectionHeading';
import { Tag } from './Tag';
import { getProjects } from '../services/contentService';
import Fuse from 'fuse.js';

const filters = ['All work', 'Full stack', 'Frontend'];

export function Projects() {
  const [filter, setFilter] = useState('All work');
  const [search, setSearch] = useState('');
  
  const projects = getProjects();

  // Initialize Fuse.js for client-side fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(projects, {
      keys: ['title', 'description', 'tags'],
      threshold: 0.3,
    });
  }, [projects]);

  // Combine category filtering and Fuse.js fuzzy search
  const results = useMemo(() => {
    let list = projects;

    // Filter by type first
    if (filter !== 'All work') {
      list = list.filter((p) => p.type === filter);
    }

    // Apply Fuse.js fuzzy search if search query is present
    if (search.trim() !== '') {
      const searchResults = fuse.search(search);
      const matchedSlugs = new Set(searchResults.map((r) => r.item.slug));
      list = list.filter((p) => matchedSlugs.has(p.slug));
    }

    return list;
  }, [filter, search, projects, fuse]);

  return (
    <section id="projects" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="02 / SELECTED WORK"
          title="Useful work, made with care."
          description="A selection of product work across strategy, interface systems, and full-stack implementation."
          action={
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden text-sm text-muted hover:text-ink md:block"
            >
              Discuss a project <span className="text-brand">↗</span>
            </a>
          }
        />

        {/* Filters & search */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                  filter === f
                    ? 'border-zinc-500 bg-card text-ink'
                    : 'border-line text-muted hover:text-ink'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-lg border border-line bg-background px-3 py-2 text-muted">
            <span className="text-sm">⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects"
              className="w-36 bg-transparent text-xs text-ink outline-none placeholder:text-zinc-600"
            />
          </label>
        </div>

        {/* Project grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
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
      </div>
    </section>
  );
}
