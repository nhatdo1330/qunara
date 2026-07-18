import { BookOpen, BrainCircuit, Compass, Heart, Scale, SearchCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { StoryScene } from "./story-scene";

export async function FounderJourney() {
  const t = await getTranslations("about.journey");
  const principles = [
    [SearchCheck,"evidence"],[BookOpen,"context"],[Scale,"difference"],
    [BrainCircuit,"reflection"],[Heart,"practice"],[Compass,"community"],
  ] as const;
  return <div className="about-founder-journey" id="founder-journey">
    <StoryScene id="childhood" number="02" eyebrow={t("childhood.eyebrow")} title={<>{t("childhood.titleOne")}<br/>{t("childhood.titleTwo")}</>} quote={t("childhood.quote")} art="childhood">
      <p>{t("childhood.p1")}</p><p>{t("childhood.p2")}</p><p>{t("childhood.p3")}</p>
    </StoryScene>
    <StoryScene id="technology" number="03" eyebrow={t("technology.eyebrow")} title={<>{t("technology.titleOne")}<br/>{t("technology.titleTwo")}</>} quote={t("technology.quote")} art="technology" reverse>
      <p>{t("technology.p1")}</p><p>{t("technology.p2")}</p><p>{t("technology.p3")}</p>
    </StoryScene>
    <StoryScene id="rediscovery" number="04" eyebrow={t("rediscovery.eyebrow")} title={<>{t("rediscovery.titleOne")}<br/><em>{t("rediscovery.titleTwo")}</em></>} quote={t("rediscovery.quote")} art="return">
      <p>{t("rediscovery.p1")}</p><p>{t("rediscovery.p2")}</p><p>{t("rediscovery.p3")}</p>
    </StoryScene>
    <StoryScene id="ai-quantum" number="05" eyebrow={t("questions.eyebrow")} title={<>{t("questions.titleOne")}<br/>{t("questions.titleTwo")}</>} quote={t("questions.quote")} art="quantum" reverse>
      <p>{t("questions.p1")}</p><p>{t("questions.p2")}</p><p>{t("questions.p3")}</p>
    </StoryScene>
    <StoryScene id="principles" number="06" eyebrow={t("purpose.eyebrow")} title={<>{t("purpose.titleOne")}<br/>{t("purpose.titleTwo")}</>} art="community">
      <p>{t("purpose.p1")}</p><p>{t("purpose.p2")}</p>
      <aside className="about-qunara-statement"><strong>{t("purpose.statement")}</strong><span>{t("purpose.statementDetail")}</span></aside>
      <div className="about-principle-grid">{principles.map(([Icon,key])=><article key={key}><Icon/><h3>{t(`purpose.principles.${key}Title`)}</h3><p>{t(`purpose.principles.${key}Text`)}</p></article>)}</div>
    </StoryScene>
  </div>;
}
