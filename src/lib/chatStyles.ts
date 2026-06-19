import { CONTENT_CARD_CLASS, PAGE_TITLE_RULE_CLASS } from "@/lib/pageStyles";

export { PAGE_TITLE_RULE_CLASS };

/** Matches quote / reservation form inputs site-wide. */
export const CHAT_INPUT_CLASS =
  "min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 transition-shadow duration-200 focus:border-blue-200 focus:ring-2";

export const CHAT_SHELL_CLASS =
  "flex flex-col overflow-hidden rounded-2xl border border-blue-100/85 bg-surface/95 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05]";

export const CHAT_SHELL_ACCENT =
  "pointer-events-none h-1 w-full shrink-0 bg-gradient-to-r from-blue-600 via-blue-500 to-amber-300 shadow-sm shadow-amber-500/20";

export const CHAT_FORM_CLASS = CONTENT_CARD_CLASS;

export const CHAT_CTA_BUTTON_CLASS =
  "min-h-[52px] rounded-full bg-cta px-8 py-3.5 text-base font-bold text-cta-foreground shadow-lg shadow-amber-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

export const CHAT_INBOX_ITEM_CLASS =
  "block rounded-2xl border border-blue-100/90 bg-surface/95 p-4 ring-1 ring-white/60 shadow-sm shadow-blue-900/[0.04] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300/80 hover:shadow-md hover:shadow-amber-900/[0.06]";

export function chatBubbleClass(isOwn: boolean): string {
  const base =
    "max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] sm:text-base";
  if (isOwn) {
    return `${base} rounded-2xl rounded-br-md bg-gradient-to-br from-accent to-accent-hover text-white shadow-md shadow-blue-900/15`;
  }
  return `${base} rounded-2xl rounded-bl-md border border-blue-100/90 border-l-[3px] border-l-amber-400 bg-white text-slate-800`;
}
