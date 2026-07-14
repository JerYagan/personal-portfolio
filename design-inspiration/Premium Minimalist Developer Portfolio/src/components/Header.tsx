const navItems = ["Home", "About", "Projects", "Experience", "Contact"];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <a href="#home" className="flex items-center gap-2 text-sm font-semibold tracking-[-0.02em]">
          <span className="grid size-6 place-items-center rounded-[7px] bg-ink text-xs font-bold text-background">A</span>
          ARUN.DEV
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted transition-colors hover:text-ink">{item}</a>)}
        </nav>
        <a href="#contact" className="rounded-lg border border-line px-3.5 py-2 text-sm font-medium transition-colors hover:border-zinc-600 hover:bg-card">Resume <span className="ml-1 text-muted">↗</span></a>
      </div>
    </header>
  );
}
