export type OneShotState = {
  activated: boolean;
  muted: boolean;
  isPlaying: boolean;
  now: number;
  lastPlayedAt: number;
  minimumInterval: number;
};

export function canPlayOneShot(state:OneShotState):boolean{
  return state.activated&&!state.muted&&!state.isPlaying&&state.now-state.lastPlayedAt>=state.minimumInterval;
}

export type BellState=OneShotState&{
  breathingVisible:boolean;
  lastInteractionAt:number;
  interactionQuietPeriod:number;
};

export function canPlayBell(state:BellState):boolean{
  return !state.breathingVisible&&state.now-state.lastInteractionAt>=state.interactionQuietPeriod&&canPlayOneShot(state);
}

export function reminderDelay(randomValue:number):number{
  return 25_000+Math.max(0,Math.min(1,randomValue))*15_000;
}

