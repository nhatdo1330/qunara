# Qunara Path of Seeing
## Audio, Breath & Presence UX Specification
Version 1.0

---

# Design Philosophy

The experience is **not meditation instruction**.

It is not a breathing trainer.

It is not mindfulness coaching.

It is a quiet companion that gently creates enough spaciousness for reflection.

Breath, sound and interaction exist only to soften attention—not to control it.

Users should never feel they are succeeding or failing.

---

# Experience Timeline

```
Open
    ↓
Silent Landscape
    ↓
First Touch
    ↓
Ambient world awakens
    ↓
Reflection exploration
    ↓
Occasional breathing invitations
    ↓
Deeper stillness
    ↓
Final lotus scene
    ↓
Fade to silence
```

No clocks are shown.

No countdown is shown.

Session length is configurable (default 5 minutes).

---

# Audio Engine

## Principle

Sound reacts to attention.

It never asks for attention.

The user discovers the soundscape naturally.

---

# Layer Architecture

## Layer A — Base Water Ambience

Purpose

Provide emotional grounding.

Examples

- slow river
- gentle shoreline
- small forest stream
- distant lake ripples

Characteristics

Loop seamlessly.

No identifiable rhythm.

Very low frequency movement.

Stereo width:

Medium.

Volume

18–24%.

Always active after first interaction.

---

## Layer B — Wind

Purpose

Create spaciousness.

Characteristics

Very subtle.

Long evolving textures.

No whistles.

No dramatic gusts.

Movement

Randomized.

Appears every

20–60 seconds.

Duration

5–20 seconds.

Volume

6–14%.

---

## Layer C — Night Environment

Purpose

Create living silence.

Possible sounds

Very distant

- insects
- leaves
- distant birds
- quiet woodland ambience

Never continuous.

Density

Very sparse.

Random interval

30–90 seconds.

---

## Layer D — Bell

Purpose

Mark moments of spaciousness.

Not a timer.

Not a reminder.

Not progress.

Instrument

Soft meditation bell.

Long decay.

No bright attack.

Behavior

Bell may play only when:

- no node selected recently
- user inactive for several seconds
- breathing prompt not currently visible

Minimum interval

45 seconds.

Maximum frequency

About once every 90 seconds.

Bell probability increases as interaction slows.

---

## Layer E — Node Tone

Purpose

Reward curiosity.

Instrument

Small glass harmonic.

Length

120–250 ms.

Pitch

Random within gentle pentatonic palette.

Volume

Low.

No accumulation.

Rapid tapping automatically reduces volume.

---

## Layer F — Final Lotus Layer

Activated only near completion.

Adds

- soft choir pad
- warm harmonic bloom
- distant sustained resonance

Never dramatic.

Duration

Final 20–40 seconds.

---

# Sound Activation

No sound on page load.

Audio begins only after

- first tap
- first node expansion
- first drag

Required because of browser autoplay policies.

Fade in

2–3 seconds.

---

# Volume Mixing

Suggested relative mix

Water

100%

Wind

35%

Night

25%

Bell

45%

Node tone

30%

Lotus harmonic

55%

Limiter

Enabled.

No clipping.

---

# Breathing Philosophy

Breathing is an invitation.

Never instruction.

Never correction.

Never synchronized.

Never measured.

The app never evaluates breathing.

---

# Reminder Timing

Random interval

25–40 seconds.

Natural jitter

±4 seconds.

Avoid obvious rhythm.

Skip reminder if

- user rapidly exploring
- another reminder shown recently
- user inactive for less than 8 seconds after node expansion

Maximum reminders

Approximately

6–8

during a five-minute session.

---

# Reminder Appearance

Fade

500 ms.

Stay

4–6 seconds.

Fade

700 ms.

Opacity

70–80%.

Small typography.

Near lower third.

Never modal.

Never blocks nodes.

---

# Vietnamese Reminder Pool

Examples

- Hít vào thật nhẹ.
- Thở ra chậm rãi.
- Chỉ cần nhận biết hơi thở.
- Trở về với một hơi thở.
- Có thể dừng lại một chút.
- Không cần thay đổi điều gì.
- Hơi thở vẫn luôn ở đây.
- Chỉ cần nhận ra khoảnh khắc này.
- Có thể mỉm cười với một hơi thở.
- Lặng yên cũng là một cách nhìn.
- Không cần vội.
- Một nhịp thở cũng đủ.

Rules

Never repeat the previous phrase.

Prefer semantic diversity.

Avoid repeating any phrase within the last three reminders.

---

# Interaction Rules

Node expanded

No breathing prompt

for

8 seconds.

Node collapsed

No prompt

for

5 seconds.

Rapid tapping

Suppress

- bell
- breathing reminder

until interaction slows.

Dragging landscape

Do not show reminders.

Pause reminder timer.

Reading mode

If user remains on one node

longer than

12 seconds,

increase probability of gentle reminder.

---

# Bell Logic

Pseudo

```
if user_interacting:
    suppress bell

if node_selected_within_8s:
    suppress bell

if breathing_prompt_visible:
    suppress bell

if ambient_time > random(45-90):
    play bell
```

---

# Haptic Philosophy

Haptics should almost disappear.

They should reinforce physical presence rather than celebrate actions.

---

# Supported Events

## First Node Expansion

Very light impact.

Equivalent

Impact Light.

Only once.

---

## Branch Expansion

Selection feedback.

Extremely subtle.

---

## Major Reflection Transition

Soft pulse.

When entering a much deeper layer.

Maximum

2

per session.

---

## Final Lotus Reveal

Gentle double pulse.

Slow spacing.

Feels like a distant heartbeat.

---

## Unsupported Events

No vibration for

- every tap
- scrolling
- dragging
- breathing reminder
- ambience
- timer
- bell

---

# Accessibility

Respect

Reduced Motion.

If enabled

Reduce

- node motion
- particle drift
- camera movement

Maintain

opacity transitions.

---

Respect

Reduced Transparency.

Increase text contrast.

---

Respect

System Haptics Disabled.

Disable all vibration.

---

Respect

Mute Switch

Visual experience remains complete.

No interaction requires audio.

---

# Timing Summary

| Event | Timing |
|---------|--------|
| Audio fade in | 2–3 s |
| Water ambience | Continuous |
| Wind | Every 20–60 s |
| Night ambience | Every 30–90 s |
| Bell | 45–90 s when calm |
| Breathing invitation | Every 25–40 s with variation |
| Reminder duration | 4–6 s |
| Node tone | 120–250 ms |
| Lotus layer | Final 20–40 s |
| Audio fade out | 3–5 s |

---

# Emotional Design Goals

The user should gradually feel:

1. Curious rather than instructed.
2. Calm without noticing why.
3. Comfortable pausing naturally.
4. Less hurried in exploring thoughts.
5. Free to leave the experience at any moment.

The experience should never imply there is a correct pace, a correct breath, or a correct insight. Audio, breath, interaction, and haptics simply create conditions in which reflection can unfold gently.