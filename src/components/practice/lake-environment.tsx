import styles from "./wave-of-thoughts.module.css";

export function LakeEnvironment({releases,stars,reducedMotion}:{releases:number;stars:{id:number;x:number;y:number}[];reducedMotion:boolean}){
  const open=Math.min(1,releases/30);
  const sceneStyle={"--moon-opacity":.28+Math.min(releases,15)*.025,"--mist-opacity":.46-Math.min(releases,12)*.018,"--path-opacity":Math.max(0,releases-4)/10,"--galaxy-opacity":Math.max(0,releases-24)/6} as React.CSSProperties;
  return <div className={`${styles.environment} ${reducedMotion?styles.reduced:""}`} style={sceneStyle} aria-hidden="true">
    <div className={styles.sky}>{Array.from({length:42},(_,index)=><i key={index} style={{left:`${(index*47)%97}%`,top:`${5+(index*29)%46}%`,opacity:releases>=15?(.2+(index%5)*.12):.08}}/>)}{stars.map(star=><i className={styles.createdStar} key={star.id} style={{left:`${star.x}%`,top:`${star.y}%`}}/>)}<div className={styles.moon}/><div className={styles.mountains}><i/><i/><i/></div></div>
    <div className={styles.mist}><i/><i/></div><div className={styles.water}><div className={styles.moonPath}/><div className={styles.galaxy}/>{Array.from({length:7},(_,index)=><i key={index}/>)}</div>
    <div className={styles.lotus}>{Array.from({length:12},(_,index)=><i key={index} style={{transform:`translateX(-50%) rotate(${(index-5.5)*7*open}deg) translateY(${(1-open)*24}px) scale(${.55+open*.45})`,opacity:.12+open*.75}}/>)}<b/></div>
    {releases>=10&&<div className={styles.fireflies}>{Array.from({length:18},(_,index)=><i key={index} style={{left:`${8+(index*43)%84}%`,top:`${38+(index*31)%48}%`,animationDelay:`${index*.43}s`}}/>)}</div>}<div className={styles.vignette}/>
  </div>
}
