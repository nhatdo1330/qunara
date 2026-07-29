"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Check, History, Pause, Play, RefreshCcw, Volume2, VolumeX } from "lucide-react";

type Practice = "breath" | "mindfulness" | "compassion" | "loving" | "nonduality";
type Sound = "none" | "forest" | "rain" | "ocean" | "river" | "temple" | "night";
type Voice = "en" | "vi" | "silent";
type Status = "idle" | "running" | "paused" | "complete";
type Mood = "calm" | "clear" | "restless" | "tender" | "grateful";
type Session = { id: number; endedAt: string; practice: Practice; minutes: number; mood?: Mood; journal?: string };

const copy = {
  en: {
    eyebrow:"Practice · Meditation studio", title:"A quiet place to return.", intro:"Choose a practice, set the time, and let the studio hold the edges of your session.",
    configure:"Prepare your session", configureNote:"Nothing begins until you press Start.", practice:"Practice", duration:"Duration", minutes:"minutes", sound:"Ambient sound", voice:"Guided voice", bells:"Bells", startBell:"Beginning", endBell:"Ending", interval:"Interval", noInterval:"No interval", every:"Every {n} min", ambientVolume:"Ambient volume", bellVolume:"Bell volume",
    practices:{breath:"Breath",mindfulness:"Mindfulness",compassion:"Compassion",loving:"Loving kindness",nonduality:"Non-duality"},
    sounds:{none:"None",forest:"Forest",rain:"Rain",ocean:"Ocean",river:"River",temple:"Temple bell",night:"Night"}, voices:{en:"English",vi:"Vietnamese",silent:"Silent"},
    ready:"Ready when you are", running:"Stay with this moment", paused:"Session paused", complete:"Session complete", start:"Start meditation", pause:"Pause", resume:"Resume", restart:"Restart",
    reflection:"A moment of reflection", reflectionNote:"This stays only in this browser.", mood:"How do you feel now?", moods:{calm:"Calm",clear:"Clear",restless:"Restless",tender:"Tender",grateful:"Grateful"}, journal:"One sentence from this session", placeholder:"What did you notice?", save:"Save reflection", skip:"Save without reflection",
    history:"Practice history", local:"Stored locally · no account required", empty:"Your completed sessions will appear here.", clear:"Clear history", session:"session", sessions:"sessions", total:"Total practice", confirmClear:"Clear all practice history on this browser?", audioHint:"Audio begins only after you start the session.", progress:"Meditation timer"
  },
  vi: {
    eyebrow:"Thực hành · Phòng thiền", title:"Một nơi yên tĩnh để trở về.", intro:"Chọn cách thực hành, đặt thời gian, rồi để phòng thiền giữ nhịp cho buổi ngồi của bạn.",
    configure:"Chuẩn bị buổi thiền", configureNote:"Âm thanh chỉ bắt đầu khi bạn nhấn Bắt đầu.", practice:"Phương pháp", duration:"Thời lượng", minutes:"phút", sound:"Âm thanh nền", voice:"Hướng dẫn", bells:"Chuông", startBell:"Mở đầu", endBell:"Kết thúc", interval:"Chuông giữa giờ", noInterval:"Không dùng", every:"Mỗi {n} phút", ambientVolume:"Âm lượng nền", bellVolume:"Âm lượng chuông",
    practices:{breath:"Hơi thở",mindfulness:"Chánh niệm",compassion:"Từ bi",loving:"Tâm từ",nonduality:"Bất nhị"},
    sounds:{none:"Không",forest:"Rừng",rain:"Mưa",ocean:"Biển",river:"Dòng sông",temple:"Chuông chùa",night:"Đêm"}, voices:{en:"Tiếng Anh",vi:"Tiếng Việt",silent:"Im lặng"},
    ready:"Sẵn sàng khi bạn muốn", running:"Ở lại với giây phút này", paused:"Buổi thiền đang tạm dừng", complete:"Buổi thiền đã hoàn tất", start:"Bắt đầu thiền", pause:"Tạm dừng", resume:"Tiếp tục", restart:"Bắt đầu lại",
    reflection:"Một phút nhìn lại", reflectionNote:"Nội dung này chỉ được lưu trong trình duyệt của bạn.", mood:"Lúc này bạn cảm thấy thế nào?", moods:{calm:"An tĩnh",clear:"Sáng rõ",restless:"Bồn chồn",tender:"Dịu lại",grateful:"Biết ơn"}, journal:"Một câu ghi lại buổi thiền", placeholder:"Bạn đã nhận ra điều gì?", save:"Lưu suy ngẫm", skip:"Lưu không kèm suy ngẫm",
    history:"Lịch sử thực hành", local:"Chỉ lưu trên thiết bị · không cần tài khoản", empty:"Những buổi thiền đã hoàn tất sẽ xuất hiện ở đây.", clear:"Xóa lịch sử", session:"buổi", sessions:"buổi", total:"Tổng thời gian", confirmClear:"Xóa toàn bộ lịch sử thực hành trên trình duyệt này?", audioHint:"Âm thanh chỉ phát sau khi bạn bắt đầu buổi thiền.", progress:"Đồng hồ thiền"
  }
} as const;

const soundFiles: Record<Exclude<Sound,"none">,string> = {forest:"forest",rain:"rain",ocean:"ocean",river:"river",temple:"temple",night:"night"};
const STORAGE = "qunara-meditation-history-v1";
const fmt = (seconds:number) => `${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;

export function MeditationStudio(){
  const locale = useLocale() === "vi" ? "vi" : "en"; const t=copy[locale];
  const [practice,setPractice]=useState<Practice>("breath"),[duration,setDuration]=useState(10),[sound,setSound]=useState<Sound>("none"),[voice,setVoice]=useState<Voice>("silent");
  const [startBell,setStartBell]=useState(true),[endBell,setEndBell]=useState(true),[interval,setIntervalBell]=useState(0),[ambientVolume,setAmbientVolume]=useState(.35),[bellVolume,setBellVolume]=useState(.55);
  const [status,setStatus]=useState<Status>("idle"),[remaining,setRemaining]=useState(600),[history,setHistory]=useState<Session[]>([]),[mood,setMood]=useState<Mood|undefined>(),[journal,setJournal]=useState("");
  const ambientRef=useRef<HTMLAudioElement>(null),bellRef=useRef<HTMLAudioElement>(null),voiceRef=useRef<HTMLAudioElement>(null),deadline=useRef(0),intervalsPlayed=useRef(new Set<number>()),fadeFrame=useRef<number>();
  const total=duration*60, elapsed=total-remaining;

  useEffect(()=>{try{const raw=localStorage.getItem(STORAGE);if(raw)setHistory(JSON.parse(raw) as Session[])}catch{}},[]);
  useEffect(()=>{if(status==="idle")setRemaining(total)},[total,status]);
  const fade=useCallback((target:number,after?:()=>void)=>{const a=ambientRef.current;if(!a)return;cancelAnimationFrame(fadeFrame.current??0);const from=a.volume,start=performance.now();const step=(now:number)=>{const p=Math.min(1,(now-start)/2000);a.volume=from+(target-from)*p;if(p<1)fadeFrame.current=requestAnimationFrame(step);else after?.()};fadeFrame.current=requestAnimationFrame(step)},[]);
  const ringBell=useCallback(()=>{const a=bellRef.current;if(!a)return;a.volume=bellVolume;a.currentTime=0;void a.play().catch(()=>{})},[bellVolume]);
  const finish=useCallback(()=>{setStatus("complete");setRemaining(0);fade(0,()=>ambientRef.current?.pause());if(endBell)ringBell()},[endBell,fade,ringBell]);
  useEffect(()=>{if(status!=="running")return;const tick=()=>{const next=Math.max(0,Math.ceil((deadline.current-Date.now())/1000));setRemaining(next);const passed=total-next;if(interval>0){const marker=Math.floor(passed/(interval*60));if(marker>0&&passed<total&&!intervalsPlayed.current.has(marker)){intervalsPlayed.current.add(marker);ringBell()}}if(next===0)finish()};tick();const id=window.setInterval(tick,250);return()=>window.clearInterval(id)},[status,total,interval,ringBell,finish]);
  useEffect(()=>()=>{cancelAnimationFrame(fadeFrame.current??0)},[]);

  function playAmbient(){const a=ambientRef.current;if(!a||sound==="none")return;a.volume=0;void a.play().then(()=>fade(ambientVolume)).catch(()=>{});}
  function start(){setRemaining(total);intervalsPlayed.current.clear();deadline.current=Date.now()+total*1000;setStatus("running");if(startBell)ringBell();playAmbient();if(voice!=="silent"&&voiceRef.current){voiceRef.current.currentTime=0;void voiceRef.current.play().catch(()=>{})}}
  function pause(){setStatus("paused");fade(0,()=>ambientRef.current?.pause())}
  function resume(){deadline.current=Date.now()+remaining*1000;setStatus("running");playAmbient()}
  function restart(){setStatus("idle");setRemaining(total);intervalsPlayed.current.clear();fade(0,()=>{if(ambientRef.current){ambientRef.current.pause();ambientRef.current.currentTime=0}});voiceRef.current?.pause()}
  function persist(session:Session){const next=[session,...history].slice(0,100);setHistory(next);localStorage.setItem(STORAGE,JSON.stringify(next));setStatus("idle");setRemaining(total);setMood(undefined);setJournal("")}
  function save(e?:FormEvent){e?.preventDefault();persist({id:Date.now(),endedAt:new Date().toISOString(),practice,minutes:duration,mood,journal:journal.trim().slice(0,180)||undefined})}
  const totalMinutes=useMemo(()=>history.reduce((sum,x)=>sum+x.minutes,0),[history]);
  const statusText=status==="running"?t.running:status==="paused"?t.paused:status==="complete"?t.complete:t.ready;

  return <main className="meditation-studio">
    <header className="studio-hero q-shell"><p className="q-kicker">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p></header>
    <div className="studio-layout q-shell">
      <section className="studio-config" aria-labelledby="configure-title"><div className="studio-section-title"><div><span>01</span><h2 id="configure-title">{t.configure}</h2></div><p>{t.configureNote}</p></div>
        <OptionGroup label={t.practice}>{(Object.keys(t.practices) as Practice[]).map(x=><Choice key={x} active={practice===x} onClick={()=>setPractice(x)}>{t.practices[x]}</Choice>)}</OptionGroup>
        <OptionGroup label={t.duration}>{[5,10,20,30].map(x=><Choice key={x} active={duration===x} onClick={()=>setDuration(x)}>{x} {t.minutes}</Choice>)}</OptionGroup>
        <OptionGroup label={t.sound}>{(Object.keys(t.sounds) as Sound[]).map(x=><Choice key={x} active={sound===x} onClick={()=>setSound(x)}>{t.sounds[x]}</Choice>)}</OptionGroup>
        <OptionGroup label={t.voice}>{(["en","vi","silent"] as Voice[]).map(x=><Choice key={x} active={voice===x} onClick={()=>setVoice(x)}>{t.voices[x]}</Choice>)}</OptionGroup>
        <fieldset className="bell-settings"><legend>{t.bells}</legend><label><input type="checkbox" checked={startBell} onChange={e=>setStartBell(e.target.checked)}/><span>{t.startBell}</span></label><label><input type="checkbox" checked={endBell} onChange={e=>setEndBell(e.target.checked)}/><span>{t.endBell}</span></label><label className="interval-label"><span>{t.interval}</span><select value={interval} onChange={e=>setIntervalBell(Number(e.target.value))}><option value="0">{t.noInterval}</option>{[5,10].map(x=><option value={x} key={x}>{t.every.replace("{n}",String(x))}</option>)}</select></label></fieldset>
        <div className="volume-controls"><VolumeControl label={t.ambientVolume} value={ambientVolume} onChange={setAmbientVolume}/><VolumeControl label={t.bellVolume} value={bellVolume} onChange={setBellVolume}/></div><small className="audio-note"><VolumeX/>{t.audioHint}</small>
      </section>
      <section className="studio-timer" aria-labelledby="timer-title"><div className="timer-topline"><span>02</span><h2 id="timer-title">{t.progress}</h2></div><div className={`studio-ring ${status}`} style={{"--progress":`${total?elapsed/total*360:0}deg`} as React.CSSProperties} role="timer" aria-label={`${t.progress}: ${fmt(remaining)}`}><div><time aria-live="off">{fmt(remaining)}</time><span aria-live="polite">{statusText}</span></div></div>
        <div className="studio-controls">{status==="idle"||status==="complete"?<button className="primary" onClick={start}><Play/>{t.start}</button>:status==="running"?<button className="primary" onClick={pause}><Pause/>{t.pause}</button>:<button className="primary" onClick={resume}><Play/>{t.resume}</button>}<button onClick={restart}><RefreshCcw/>{t.restart}</button></div>
        <div className="session-summary"><span>{t.practices[practice]}</span><i/><span>{duration} {t.minutes}</span><i/><span>{t.sounds[sound]}</span></div>
      </section>
    </div>
    {status==="complete"&&<section className="studio-reflection q-shell"><div><p className="q-kicker">03 · {t.reflection}</p><h2>{t.reflection}</h2><p>{t.reflectionNote}</p></div><form onSubmit={save}><fieldset><legend>{t.mood}</legend><div className="mood-grid">{(Object.keys(t.moods) as Mood[]).map(x=><Choice key={x} active={mood===x} onClick={()=>setMood(x)}>{t.moods[x]}</Choice>)}</div></fieldset><label htmlFor="session-journal">{t.journal}</label><input id="session-journal" maxLength={180} value={journal} onChange={e=>setJournal(e.target.value)} placeholder={t.placeholder}/><div className="reflection-actions"><button className="primary"><Check/>{t.save}</button><button type="button" onClick={()=>save()}>{t.skip}</button></div></form></section>}
    <section className="studio-history q-shell">
      <div className="history-heading"><div><p className="q-kicker">04 · <History/> {t.history}</p><h2>{t.history}</h2><p>{t.local}</p></div><div className="history-total"><b>{totalMinutes}</b><span>{t.minutes}<br/>{t.total}</span></div></div>
      {history.length===0 ? <p className="history-empty">{t.empty}</p> : <>
        <ol>{history.slice(0,10).map(x=><li key={x.id}><time dateTime={x.endedAt}>{new Intl.DateTimeFormat(locale,{month:"short",day:"numeric",year:"numeric"}).format(new Date(x.endedAt))}</time><strong>{t.practices[x.practice]}</strong><span>{x.minutes} {t.minutes}</span>{x.mood&&<em>{t.moods[x.mood]}</em>}{x.journal&&<p>“{x.journal}”</p>}</li>)}</ol>
        <button className="clear-history" onClick={()=>{if(confirm(t.confirmClear)){localStorage.removeItem(STORAGE);setHistory([])}}}>{t.clear}</button>
      </>}
    </section>
    <audio ref={ambientRef} key={sound} src={sound==="none"?undefined:`/audio/meditation/${soundFiles[sound]}.wav`} loop preload="none"/><audio ref={bellRef} src="/audio/meditation/bell.wav" preload="auto"/><audio ref={voiceRef} key={voice} src={voice==="silent"?undefined:`/audio/meditation/guide-${voice}.wav`} preload="none"/>
  </main>
}

function OptionGroup({label,children}:{label:string;children:React.ReactNode}){return <fieldset className="studio-options"><legend>{label}</legend><div>{children}</div></fieldset>}
function Choice({active,onClick,children}:{active:boolean;onClick:()=>void;children:React.ReactNode}){return <button type="button" aria-pressed={active} className={active?"active":""} onClick={onClick}>{children}</button>}
function VolumeControl({label,value,onChange}:{label:string;value:number;onChange:(n:number)=>void}){return <label><span>{value===0?<VolumeX/>:<Volume2/>}{label}</span><input aria-label={label} type="range" min="0" max="1" step=".05" value={value} onChange={e=>onChange(Number(e.target.value))}/></label>}
