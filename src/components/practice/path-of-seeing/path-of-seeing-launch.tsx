import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pathOfSeeingCopy, type PathLocale } from "./path-of-seeing-config";
import styles from "./path-of-seeing.module.css";

export function PathOfSeeingLaunch({locale}:{locale:PathLocale}){const t=pathOfSeeingCopy[locale];return <section className={styles.practiceLaunch}><div><p className="q-kicker">06 · {t.kicker}</p><h2>{t.launchTitle}</h2><p>{t.launchBody}</p></div><Link href="/practice/path-of-seeing" className="q-btn-primary">{t.open}<ArrowRight/></Link></section>}
