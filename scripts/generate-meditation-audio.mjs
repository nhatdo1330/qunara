import { mkdirSync, writeFileSync } from "node:fs";

const rate=22050, out="public/audio/meditation"; mkdirSync(out,{recursive:true});
function wav(name,seconds,sample){const n=rate*seconds,b=Buffer.alloc(44+n*2);b.write("RIFF",0);b.writeUInt32LE(36+n*2,4);b.write("WAVEfmt ",8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write("data",36);b.writeUInt32LE(n*2,40);for(let i=0;i<n;i++)b.writeInt16LE(Math.max(-1,Math.min(1,sample(i/rate,i)))*32767,44+i*2);writeFileSync(`${out}/${name}.wav`,b)}
let seed=941;const noise=()=>{seed=(seed*16807)%2147483647;return seed/1073741824-1};
wav("forest",12,(t)=>noise()*.025+Math.sin(t*2*Math.PI*1700)*Math.max(0,Math.sin(t*.63))*0.012);
wav("rain",10,()=>noise()*.10);
wav("ocean",12,(t)=>noise()*(.025+.06*(Math.sin(t*.55)+1)/2));
wav("river",10,(t)=>noise()*.055+Math.sin(t*2*Math.PI*130)*.008);
wav("night",12,(t)=>noise()*.018+(Math.sin(t*2*Math.PI*2200)*Math.max(0,Math.sin(t*.9))*0.008));
wav("temple",12,(t)=>{const p=t%6;return p<5?(Math.sin(p*2*Math.PI*220)+.45*Math.sin(p*2*Math.PI*441))*Math.exp(-p*1.4)*.22:0});
wav("bell",4,(t)=>(Math.sin(t*2*Math.PI*440)+.5*Math.sin(t*2*Math.PI*883)+.2*Math.sin(t*2*Math.PI*1321))*Math.exp(-t*1.6)*.25);
wav("air-tone",2,(t)=>(Math.sin(t*2*Math.PI*740)+.35*Math.sin(t*2*Math.PI*1110))*Math.sin(Math.PI*Math.min(1,t/.4))*Math.exp(-t*2.2)*.08);
wav("ripple",2,(t)=>Math.sin(t*2*Math.PI*(250-t*45))*Math.exp(-t*2.4)*.12+noise()*.008*Math.exp(-t*3));
