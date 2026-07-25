import Link from "next/link";
import {type ComponentType, type ReactNode} from "react";
import {ArrowRight} from "lucide-react";
import {SourceDrawerClient} from "./source-drawer-client";

export type InvestigationSource = { kind: string; title: string; publisher: string; note: string; href?: string };
export type ConfidenceItem = { label: string; value: string; tone: "strong" | "limited" | "none"; detail?: string };
type Icon = ComponentType<{ className?: string }>;

export function OpeningStory({ className, id, kicker, title, children }: { className: string; id?: string; kicker: string; title: ReactNode; children: ReactNode }) {
  return <section className={className} id={id}><div><p className="q-kicker">{kicker}</p><h2>{title}</h2></div><div>{children}</div></section>;
}

function EditorialPanel({ as: Tag = "article", className, icon: Icon, label, title, children }: { as?: "article" | "section"; className?: string; icon?: Icon; label?: string; title?: ReactNode; children: ReactNode }) {
  return <Tag className={className}>{Icon && <Icon/>}{label && <span>{label}</span>}{title && <h3>{title}</h3>}{children}</Tag>;
}

export function BuddhistSourcePanel(props: Parameters<typeof EditorialPanel>[0]) { return <EditorialPanel {...props}/>; }
export function ScienceEvidencePanel(props: Parameters<typeof EditorialPanel>[0]) { return <EditorialPanel {...props}/>; }
export function SimilaritiesPanel(props: Parameters<typeof EditorialPanel>[0]) { return <EditorialPanel {...props}/>; }
export function DifferencesPanel(props: Parameters<typeof EditorialPanel>[0]) { return <EditorialPanel {...props}/>; }
export function MisconceptionPanel(props: Parameters<typeof EditorialPanel>[0]) { return <EditorialPanel {...props}/>; }

export function ConfidenceRatings({ className, kicker = "Evidence & confidence", title, items }: { className: string; kicker?: string; title: ReactNode; items: ConfidenceItem[] }) {
  return <section className={className}><header><p className="q-kicker">{kicker}</p><h2>{title}</h2></header><div>{items.map(item => <ConfidenceRating {...item} key={item.label}/>)}</div></section>;
}

export function ConfidenceRating({ label, value, tone, detail }: ConfidenceItem) { return <div className={`evidence-pill ${tone}`}><div><span>{label}</span><b>{value}</b></div>{detail && <p>{detail}</p>}</div>; }

export function SourceDrawer({ className = "", subtitle, sources, noteTitle = "Editorial boundary", note }: { className?: string; subtitle: string; sources: InvestigationSource[]; noteTitle?: string; note: ReactNode }) {
  return <SourceDrawerClient className={className} subtitle={subtitle} sources={sources} noteTitle={noteTitle} note={note}/>;
}

function ActionCard({ icon: Icon, kicker, title, children, href, linkLabel }: { icon: Icon; kicker: string; title?: ReactNode; children?: ReactNode; href?: string; linkLabel?: string }) {
  return <article><Icon/><p className="q-kicker">{kicker}</p>{title && <h2>{title}</h2>}{children}{href && linkLabel && <Link href={href}>{linkLabel} <ArrowRight/></Link>}</article>;
}

export function ReflectionCard(props: Omit<Parameters<typeof ActionCard>[0], "kicker"> & { kicker?: string }) { return <ActionCard {...props} kicker={props.kicker ?? "Reflection"}/>; }
export function PracticeCard(props: Omit<Parameters<typeof ActionCard>[0], "kicker" | "href"> & { kicker: string; href?: string }) { return <ActionCard {...props} href={props.href ?? "/practice"}/>; }
export function CommunityQuestion(props: Omit<Parameters<typeof ActionCard>[0], "kicker" | "href"> & { kicker?: string; href?: string }) { return <ActionCard {...props} kicker={props.kicker ?? "Community discussion"} href={props.href ?? "/community"}/>; }
