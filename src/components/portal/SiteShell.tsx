import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main
        id="content"
        className="flex-1 scroll-mt-0 outline-none"
        tabIndex={-1}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
