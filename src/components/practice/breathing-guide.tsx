import styles from "./wave-of-thoughts.module.css";
export function BreathingGuide({state,inhale,exhale}:{state:"inhale"|"exhale"|null;inhale:string;exhale:string}){return <div className={`${styles.breathing} ${state?styles[state]:""}`} aria-live="polite"><span>{state==="inhale"?inhale:state==="exhale"?exhale:""}</span></div>}
