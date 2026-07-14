import { useState } from 'react';

const navItems = ['Home', 'About', 'Projects', 'Experience', 'Contact'];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const elementId = id.toLowerCase();
    
    if (elementId === 'projects') {
      const element = document.getElementById('projects');
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = '#/projects';
      }
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback for subpages (e.g. Project Details): let the native hash navigation return to Home
      window.location.hash = `#/${elementId}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
        {/* Logo */}
        <a
          href="#/"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 text-sm font-semibold tracking-[-0.02em]"
        >
          <span className="grid size-6 place-items-center rounded-[7px] bg-ink text-xs font-bold text-background">P</span>
          PORTFOLIO.DEV
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#/${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item)}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line px-3.5 py-2 text-sm font-medium transition-colors hover:border-zinc-600 hover:bg-card"
          >
            Resume <span className="ml-1 text-muted">↗</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-line p-2 text-muted transition-colors hover:bg-card hover:text-ink md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav className="border-t border-line bg-background/98 backdrop-blur-sm md:hidden">
          <div className="mx-auto max-w-[1200px] px-6 py-4 sm:px-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#/${item.toLowerCase()}`}
                onClick={(e) => {
                  setMobileOpen(false);
                  handleNavClick(e, item);
                }}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-ink"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
