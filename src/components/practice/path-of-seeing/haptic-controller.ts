let lastHapticAt=-Infinity;
export function supportsHaptics(target:unknown):target is{vibrate:(duration:number)=>boolean}{return Boolean(target&&typeof target==="object"&&"vibrate" in target&&typeof(target as{vibrate?:unknown}).vibrate==="function")}
export function canTriggerHaptic(now:number,lastAt:number,minimumInterval=1500){return now-lastAt>=minimumInterval}
export function triggerLightHaptic(){const now=Date.now();if(!canTriggerHaptic(now,lastHapticAt)||typeof navigator==="undefined"||!supportsHaptics(navigator))return false;lastHapticAt=now;try{return navigator.vibrate(8)}catch{return false}}
