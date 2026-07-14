export function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-6 py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div className="flex items-center gap-2 font-medium text-zinc-300">
          <span className="grid size-5 place-items-center rounded-md bg-ink text-[10px] font-bold text-background">P</span>
          PORTFOLIO.DEV
          <span className="ml-2 text-muted">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-5">
          <span>Designed &amp; built with care.</span>
          <a href="#home" className="text-zinc-300 hover:text-ink">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
