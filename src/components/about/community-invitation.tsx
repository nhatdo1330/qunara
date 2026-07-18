import { ArrowRight, BookOpen, Compass, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function CommunityInvitation() {
  const t = await getTranslations("about.invitation");
  return <section className="about-community-invitation" id="community-invitation">
    <FinalInvitationStudy/><div className="q-shell"><p className="q-kicker">{t("kicker")}</p><h2>{t("titleOne")}<br/><em>{t("titleTwo")}</em></h2><p>{t("body")}</p>
      <div className="about-invitation-actions"><Link href="/explore"><Compass/>{t("explore")} <ArrowRight/></Link><Link href="/learn"><BookOpen/>{t("learn")} <ArrowRight/></Link><Link href="/community"><Users/>{t("community")} <ArrowRight/></Link></div>
      <blockquote>{t("quote")}</blockquote></div>
  </section>;
}

function FinalInvitationStudy() {
  return <svg className="about-invitation-study" viewBox="0 0 1440 820" aria-hidden="true"><defs><linearGradient id="invitation-sky" x2="0" y2="1"><stop stopColor="#07121f"/><stop offset=".62" stopColor="#142536"/><stop offset="1" stopColor="#3c3a37"/></linearGradient><radialGradient id="invitation-dawn"><stop stopColor="#efd17a" stopOpacity=".42"/><stop offset=".45" stopColor="#d6ad59" stopOpacity=".1"/><stop offset="1" stopColor="#d6ad59" stopOpacity="0"/></radialGradient></defs><rect width="1440" height="820" fill="url(#invitation-sky)"/><ellipse cx="720" cy="520" rx="510" ry="350" fill="url(#invitation-dawn)"/><g className="invitation-stars" fill="#e3eaed">{Array.from({length:54},(_,i)=><circle key={i} cx={55+(i*149)%1330} cy={45+(i*83)%430} r={i%13===0?1.7:.65} opacity={.1+(i%5)*.06}/>)}</g><path d="M0 605Q225 505 420 580T820 550T1120 515T1440 540V820H0Z" fill="#172630" opacity=".82"/><path d="M0 680Q210 590 430 650T850 620T1160 578T1440 610V820H0Z" fill="#09151e"/><g className="invitation-paths" fill="none" strokeLinecap="round"><path d="M140 820C230 738 400 760 525 680s144-99 195-160" stroke="#829aa9" strokeOpacity=".3"/><path d="M515 820C540 733 625 692 720 520" stroke="#d5ac4d" strokeOpacity=".48"/><path d="M1300 820C1180 733 1000 752 880 671S770 572 720 520" stroke="#89a28e" strokeOpacity=".34"/></g><g className="invitation-people" fill="#050c12">{[325,620,1055].map(x=><g key={x} transform={`translate(${x} ${x===620?674:x===325?704:691})`}><circle cx="12" cy="9" r="7"/><path d="M6 20q6-5 12 0l7 38H14l-2-20-5 20H-5Z"/></g>)}</g><circle className="invitation-horizon-light" cx="720" cy="520" r="7" fill="#efd078"/></svg>;
}
