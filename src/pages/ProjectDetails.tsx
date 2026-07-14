import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectBySlug } from '../services/contentService';
import { parseBodySections, parseSubsections } from '../utils/markdownParser';

function Mark() {
  return (
    <span className="grid size-6 place-items-center rounded-[7px] bg-ink text-xs font-bold text-background">P</span>
  );
}

function CaseHeading({ number, title, text }: { number: string; title: string; text?: string }) {
  return (
    <div className="lg:sticky lg:top-28">
      <p className="font-mono text-[10px] tracking-[.16em] text-brand">{number}</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">{title}</h2>
      {text && <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{text}</p>}
    </div>
  );
}

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!project) {
    return (
      <main className="min-h-screen bg-background text-ink antialiased flex flex-col items-center justify-center p-6 text-center">
        <Mark />
        <h1 className="mt-6 text-2xl font-bold tracking-[-0.03em]">Project Not Found</h1>
        <p className="mt-2 text-sm text-muted">The project you are looking for does not exist or has been moved.</p>
        <Link to="/" className="mt-6 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-0.5">
          Back to portfolio
        </Link>
      </main>
    );
  }

  const { data, content } = project;
  const sections = parseBodySections(content);

  // Parse Problem & Solution subsections
  const problemSolutionContent = sections['problem & solution'] || '';
  const probSolSub = parseSubsections(problemSolutionContent);
  const problemText = probSolSub['the problem'] || '';
  const solutionText = probSolSub['the solution'] || '';

  // Parse Features from bullet list
  const featuresList: [string, string][] = [];
  const featuresContent = sections['features'] || '';
  const bulletRegex = /^-\s+\*\*(.+?)\*\*:\s*(.+)$/gm;
  let bulletMatch;
  while ((bulletMatch = bulletRegex.exec(featuresContent)) !== null) {
    featuresList.push([bulletMatch[1].trim(), bulletMatch[2].trim()]);
  }

  if (featuresList.length === 0 && featuresContent) {
    featuresContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        const text = trimmed.substring(1).trim();
        featuresList.push([text, '']);
      }
    });
  }

  // Parse Learnings subsections
  const learningsContent = sections['learnings'] || '';
  const learningsSub = parseSubsections(learningsContent);
  const challengeText = learningsSub['challenge'] || '';
  const lessonText = learningsSub['lesson'] || '';

  // Parse overview subhead/text
  const overviewContent = sections['overview'] || '';
  const overviewLines = overviewContent.split('\n').map(l => l.trim()).filter(Boolean);
  const overviewLead = overviewLines[0] || '';
  const overviewBody = overviewLines.slice(1).join('\n') || '';

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-ink antialiased"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-[-.02em]">
            <Mark /> PORTFOLIO.DEV
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/#projects" className="text-muted transition hover:text-ink">All projects</Link>
            <a href="#contact" className="rounded-lg border border-line px-3.5 py-2 font-medium transition hover:bg-card">
              Let's talk <span className="text-muted">↗</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <Link to="/#projects" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[.14em] text-muted transition hover:text-ink">
            ← BACK TO SELECTED WORK
          </Link>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[.15em] text-brand">
                <span className="size-1.5 rounded-full bg-brand" />
                CASE STUDY / {data.year}
              </div>
              <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[.98] tracking-[-0.065em] sm:text-7xl">
                {data.subtitle}
              </h1>
            </div>
            <p className="max-w-md text-[15px] leading-7 text-muted">
              {data.description}
            </p>
          </div>

          {/* Metadata grid */}
          <div className="mt-16 grid border-l border-t border-line sm:grid-cols-6">
            {([
              ['ROLE', data.role],
              ['TIMELINE', data.timeline],
              ['TEAM', data.team],
              ['STATUS', data.status]
            ] as const).map(([a, b]) => (
              <div key={a} className="border-r border-b border-line px-4 py-4 sm:col-span-1">
                <p className="font-mono text-[9px] tracking-[.13em] text-muted">{a}</p>
                <p className="mt-2 text-xs text-zinc-300">{b}</p>
              </div>
            ))}
            <div className="border-r border-b border-line px-4 py-4 sm:col-span-1">
              <p className="font-mono text-[9px] tracking-[.13em] text-muted">LIVE DEMO</p>
              <p className="mt-2 text-xs">
                {data.demo ? (
                  <a href={data.demo} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                    Visit Site ↗
                  </a>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </p>
            </div>
            <div className="border-r border-b border-line px-4 py-4 sm:col-span-1">
              <p className="font-mono text-[9px] tracking-[.13em] text-muted">REPOSITORY</p>
              <p className="mt-2 text-xs">
                {data.github ? (
                  <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                    GitHub ↗
                  </a>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browser mockup (Clickable for Lightbox) */}
      <section className="mx-auto max-w-[1200px] px-6 py-10 sm:px-8 lg:px-10">
        <div
          onClick={() => setActiveImage(data.image)}
          className="overflow-hidden rounded-panel border border-line bg-card cursor-zoom-in group"
        >
          <div className="flex h-10 items-center gap-1.5 border-b border-line px-4 bg-background/50">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-zinc-700" />
              <span className="size-2 rounded-full bg-zinc-700" />
              <span className="size-2 rounded-full bg-zinc-700" />
            </div>
            <span className="ml-3 font-mono text-[9px] tracking-[.12em] text-zinc-500">{data.appUrl.toUpperCase()}</span>
          </div>
          <div className="overflow-hidden">
            <img
              className="aspect-[2/1] w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.01] group-hover:opacity-95"
              src={data.image}
              alt={`${data.title} overview`}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 01 / Overview */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-10 border-b border-line pb-20 lg:grid-cols-[.7fr_1.3fr]">
          <CaseHeading
            number="01 / OVERVIEW"
            title="A decision engine, not another dashboard."
            text="The work began by questioning what this product should optimize for."
          />
          <div className="max-w-2xl">
            {overviewLead && (
              <p className="text-xl leading-8 tracking-[-0.025em] text-zinc-300">
                {overviewLead}
              </p>
            )}
            {overviewBody && (
              <p className="mt-5 text-[15px] leading-7 text-muted">
                {overviewBody}
              </p>
            )}
            <div className="mt-9 flex flex-wrap gap-2">
              {data.tags.map((t) => (
                <span key={t} className="rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-[10px] text-zinc-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 / Problem & Solution */}
      {(problemText || solutionText) && (
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
              <CaseHeading number="02 / PROBLEM & SOLUTION" title="Clarity was the feature." />
              <div className="grid gap-8 md:grid-cols-2">
                {problemText && (
                  <div className="rounded-panel border border-line bg-background p-6">
                    <p className="font-mono text-[10px] tracking-[.14em] text-muted">THE PROBLEM</p>
                    <h3 className="mt-4 text-lg font-semibold tracking-[-.03em]">Signal was buried under complexity.</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{problemText}</p>
                  </div>
                )}
                {solutionText && (
                  <div className="rounded-panel border border-line bg-background p-6">
                    <p className="font-mono text-[10px] tracking-[.14em] text-brand">THE SOLUTION</p>
                    <h3 className="mt-4 text-lg font-semibold tracking-[-.03em]">An intentional review flow.</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{solutionText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 03 / Features */}
      {featuresList.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <CaseHeading number="03 / FEATURES" title="Less interface. Better judgment." />
            <div className="divide-y divide-line border-y border-line">
              {featuresList.map(([title, text], i) => (
                <div className="grid gap-3 py-6 sm:grid-cols-[48px_1fr]" key={title}>
                  <span className="font-mono text-xs text-brand">0{i + 1}</span>
                  <div>
                    <h3 className="text-base font-medium">{title}</h3>
                    {text && <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{text}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 04 / Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[10px] tracking-[.16em] text-brand">04 / GALLERY</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">Designed for every context.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted">
                A responsive product system that stays composed from an operating desk to a quick mobile check-in. Click any image to enlarge.
              </p>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {data.gallery.map((item, i) => (
                <figure key={item.url} className={i === 0 ? 'lg:col-span-2' : ''}>
                  <div
                    onClick={() => setActiveImage(item.url)}
                    className="overflow-hidden rounded-panel border border-line bg-card cursor-zoom-in group"
                  >
                    <img
                      src={item.url}
                      alt={item.label}
                      loading="lazy"
                      className={`w-full object-cover opacity-75 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-95 ${
                        i === 0 ? 'aspect-[2.1/1]' : 'aspect-[1.35/1]'
                      }`}
                    />
                  </div>
                  <figcaption className="mt-3 font-mono text-[10px] tracking-[.13em] text-muted">
                    {String(i + 1).padStart(2, '0')} / {item.label.toUpperCase()}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 05 / Architecture */}
      {data.architecture && data.architecture.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <CaseHeading number="05 / ARCHITECTURE" title="Fast by default, robust by design." />
            <div className="rounded-panel border border-line bg-surface p-5 sm:p-7">
              <div className="font-mono text-[10px] leading-7 text-zinc-400">
                {data.architecture.map((arch: any, i: number) => (
                  <div key={i}>
                    {arch.client && (
                      <>
                        <p className="text-brand">CLIENT</p>
                        <p className="border-l border-line pl-5">{arch.client}</p>
                        {arch.clientExtra && <p className="border-l border-line pl-5">{arch.clientExtra}</p>}
                      </>
                    )}
                    {arch.data && (
                      <>
                        <p className="mt-3 text-brand-blue">DATA</p>
                        <p className="border-l border-line pl-5">{arch.data}</p>
                        {arch.dataExtra && <p className="border-l border-line pl-5">{arch.dataExtra}</p>}
                      </>
                    )}
                    {arch.delivery && (
                      <>
                        <p className="mt-3 text-green-400">DELIVERY</p>
                        <p className="border-l border-line pl-5">{arch.delivery}</p>
                      </>
                    )}
                    {arch.summary && (
                      <p className="mt-6 border-t border-line pt-5 text-sm leading-6 text-muted">
                        {arch.summary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 06 / Learnings */}
      {(challengeText || lessonText) && (
        <section className="border-t border-line bg-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
              <CaseHeading number="06 / LEARNINGS" title="A calm product is an active decision." />
              <div>
                <p className="text-xl leading-8 tracking-[-0.025em] text-zinc-300">
                  The best measure of success wasn't how long people stayed in the product—it was how confidently they could leave it.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {challengeText && (
                    <div className="rounded-panel border border-line bg-background p-5">
                      <p className="font-mono text-[10px] tracking-[.14em] text-muted">CHALLENGE</p>
                      <p className="mt-3 text-sm leading-6 text-zinc-300">{challengeText}</p>
                    </div>
                  )}
                  {lessonText && (
                    <div className="rounded-panel border border-line bg-background p-5">
                      <p className="font-mono text-[10px] tracking-[.14em] text-brand">LESSON</p>
                      <p className="mt-3 text-sm leading-6 text-zinc-300">{lessonText}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next project link */}
            <div id="contact" className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[10px] tracking-[.15em] text-muted">NEXT PROJECT</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-.04em]">Explore more work</h2>
              </div>
              <Link to="/" className="rounded-[10px] bg-ink px-4 py-3 text-sm font-semibold text-background transition hover:-translate-y-0.5">
                Back to portfolio <span className="ml-1">↗</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] justify-between px-6 py-7 text-xs text-muted sm:px-8 lg:px-10">
          <span>© {new Date().getFullYear()} PORTFOLIO.DEV</span>
          <Link to="/" className="hover:text-ink">Home ↑</Link>
        </div>
      </footer>

      {/* Premium Lightbox Modal overlay */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-panel border border-line bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage}
                alt="Enlarged screenshot view"
                className="w-auto h-auto max-w-full max-h-[80vh] object-contain block"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 rounded-full bg-black/60 border border-line p-2 text-zinc-300 hover:text-white transition"
                aria-label="Close image lightbox"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
