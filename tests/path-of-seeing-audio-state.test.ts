import assert from "node:assert/strict";
import test from "node:test";
import { canPlayBell, canPlayOneShot, reminderDelay } from "../src/components/practice/path-of-seeing/audio-state";
import { canTriggerHaptic } from "../src/components/practice/path-of-seeing/haptic-controller";

const ready={activated:true,muted:false,isPlaying:false,now:100_000,lastPlayedAt:0,minimumInterval:200};

test("one-shot audio requires activation and respects mute",()=>{
  assert.equal(canPlayOneShot(ready),true);
  assert.equal(canPlayOneShot({...ready,activated:false}),false);
  assert.equal(canPlayOneShot({...ready,muted:true}),false);
});

test("one-shot audio cannot overlap or repeat inside its guard interval",()=>{
  assert.equal(canPlayOneShot({...ready,isPlaying:true}),false);
  assert.equal(canPlayOneShot({...ready,lastPlayedAt:99_900}),false);
  assert.equal(canPlayOneShot({...ready,lastPlayedAt:99_799}),true);
});

test("bell waits for quiet and never competes with a breathing reminder",()=>{
  const bell={...ready,minimumInterval:45_000,lastPlayedAt:0,breathingVisible:false,lastInteractionAt:0,interactionQuietPeriod:8_000};
  assert.equal(canPlayBell(bell),true);
  assert.equal(canPlayBell({...bell,breathingVisible:true}),false);
  assert.equal(canPlayBell({...bell,lastInteractionAt:96_000}),false);
  assert.equal(canPlayBell({...bell,isPlaying:true}),false);
});

test("breathing reminder jitter stays within the approved interval",()=>{
  assert.equal(reminderDelay(0),25_000);
  assert.equal(reminderDelay(1),40_000);
  assert.equal(reminderDelay(2),40_000);
});

test("haptic guard prevents repeated vibration",()=>{
  assert.equal(canTriggerHaptic(10_000,9_000),false);
  assert.equal(canTriggerHaptic(10_500,9_000),true);
});

