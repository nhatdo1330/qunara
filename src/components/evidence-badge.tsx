export type EvidenceKind="Scientific evidence"|"Buddhist philosophy"|"Historical context"|"Personal reflection"|"Open question";
const classMap:Record<EvidenceKind,string>={"Scientific evidence":"evidence-science","Buddhist philosophy":"evidence-wisdom","Historical context":"evidence-history","Personal reflection":"evidence-reflection","Open question":"evidence-question"};
export function EvidenceBadge({kind}:{kind:EvidenceKind}){return <span className={`evidence-badge ${classMap[kind]}`}>{kind}</span>}
