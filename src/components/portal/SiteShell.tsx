"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { ChatLauncher } from "@/components/chat/ChatLauncher";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <main id="content" className="flex-1 scroll-mt-0 outline-none" tabIndex={-1}>
        {children}
      </main>
    );
  }

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
      <ChatLauncher />
    </>
  );
}
