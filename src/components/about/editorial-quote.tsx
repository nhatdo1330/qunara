import type { ReactNode } from "react";

export function EditorialQuote({ children }: { children: ReactNode }) {
  return <figure className="about-editorial-quote"><span aria-hidden="true">“</span><blockquote>{children}</blockquote></figure>;
}
