# Path of Seeing — UI Specification
# Qunara Path of Seeing
# UI & Motion Specification
## Guided Constellation Layout
Version 1.0

---

# Design Philosophy

The interface should never resemble software.

Instead, it should feel like quietly standing beside a lake at night, watching stars slowly reveal themselves.

The user is not navigating data.

The user is wandering through awareness.

Every motion should feel inevitable rather than mechanical.

The interface should communicate calm through absence rather than abundance.

---

# 1. Mobile Screen Anatomy

```
┌──────────────────────────────────────┐
│ Safe Status Area                     │
│                      🔇              │
├──────────────────────────────────────┤
│                                      │
│        Ambient Stars                 │
│                                      │
│     Related      Related             │
│                                      │
│            Focus Question            │
│                                      │
│     Related                          │
│                                      │
│                                      │
│        Breathing Circle              │
│                                      │
│──────────────────────────────────────│
│        Lotus Reflection Area         │
└──────────────────────────────────────┘
```

---

## Regions

### Region A

Top System Area

Contains

- Safe area
- Mute button
- Nothing else

Height

≈ 8% screen

---

### Region B

Contemplation Field

Largest region.

Contains

- focused question
- related questions
- ambient stars

Height

≈ 65%

---

### Region C

Breathing Area

Contains

breathing guidance only.

Nothing may overlap.

Height

≈ 15%

---

### Region D

Lotus Horizon

Reserved.

Initially almost empty.

Used for:

- reflections
- subtle mist
- lotus reveal

Height

≈ 12%

---

# 2. Safe Zones

The screen is divided into placement zones rather than coordinates.

```
      Z1

 Z2    Focus    Z3

 Z4            Z5

      Breath

      Lotus
```

---

## Zone Rules

### Focus Zone

Only one node.

Always centered horizontally.

Vertically positioned at 38–42% of screen height.

Never moves more than 40 px between transitions.

---

### Related Zones

Maximum:

3 readable nodes

Preferred locations:

Upper Left

Upper Right

Lower Left

Never below breathing area.

---

### Ambient Zones

Placed around outer ring.

No text.

Small stars only.

Maximum:

8

---

### Forbidden Areas

Nothing may enter:

- Dynamic Island
- Notch
- Camera hole
- Home indicator
- Breathing guide
- Lotus region
- Screen edges
- System gestures

---

# 3. Node Hierarchy

## Level 1

Focused Question

Exactly one.

Shows:

Full question

Primary typography

Highest glow

Receives interaction.

---

## Level 2

Related Questions

Maximum

3

Display

Short label only.

Examples

"What changes?"

"When does it appear?"

"What remains?"

No paragraph text.

---

## Level 3

Ambient Stars

No readable text.

Small lights.

Represent unseen possibilities.

Pure atmosphere.

Maximum

8

---

## Level 4

Historical Stars

Previously visited questions.

Only faint particles.

Never readable.

Never interactive.

Fade after approximately 45 seconds.

---

# 4. Node Dimensions

## Focus Node

Container Width

Maximum

72% screen width

Minimum margin

32 px

Padding

20 px

Corner Radius

999 px

---

Typography

20–24 pt

Line Height

1.4

Maximum

4 lines

---

Glow Radius

24 px

---

Touch Target

Minimum

56 × 56 pt

---

## Related Node

Width

Auto

Maximum

40% screen width

Height

One line

Maximum two lines

---

Typography

16–17 pt

---

Glow Radius

12 px

---

Touch

Minimum

48 × 48 pt

---

## Ambient Star

Diameter

6–12 px

Randomized

No text

Opacity

30–60%

---

# 5. Long Text Handling

Questions are authored in multiple forms.

Every question has

Full Version

Medium Version

Short Version

Example

Full

> What changes when you stop trying to hold this moment still?

Medium

> Stop holding this moment?

Short

> Holding?

---

Rules

If full text exceeds available width

↓

Shrink only once.

If still exceeds

↓

Use medium version.

If still exceeds

↓

Use short version.

If still exceeds

↓

Delay appearance.

Never truncate with …

Never overlap.

Never reduce font below accessibility minimum.

Vietnamese and English each have separately curated variants rather than relying on automatic truncation.

---

# 6. Placement Algorithm

## Step 1

Measure all visible labels.

---

## Step 2

Reserve:

- safe area
- breathing region
- lotus region
- focus node

---

## Step 3

Attempt placement.

Priority

Upper Left

↓

Upper Right

↓

Lower Left

↓

Outer Ring

---

## Step 4

Run collision detection.

---

## Step 5

If collision

Move within same zone.

---

## Step 6

If still collision

Use shorter label.

---

## Step 7

If still collision

Convert node to ambient star.

---

## Step 8

If still impossible

Delay node until future interaction.

---

No unrestricted force simulation is ever used.

The layout remains predictable and serene.

---

# 7. Collision Rules

Two readable nodes may never intersect.

Minimum spacing

24 px

Preferred

40 px

Glow is included in collision calculation.

Touch targets are included.

Historical stars are ignored.

Ambient stars may overlap slightly.

Readable nodes never overlap:

- breathing circle
- mute control
- lotus horizon
- screen edge
- focused node

---

# 8. Animation Durations

## Initial Fade

900 ms

---

Focus Glow

700 ms

Ease

Ease Out Cubic

---

Question Dissolve

800 ms

---

Particle Drift

2–4 seconds

---

Related Node Emergence

300 ms delay

600 ms fade

150 ms stagger

---

Historical Star Fade

45 seconds

---

Lotus Reveal

5–8 seconds

---

Camera

Never moves.

---

# 9. Touch Interaction

Touch begins

↓

Node brightens

120 ms

↓

Tiny haptic

↓

Node lifts

12 px

↓

Previous focus fades

↓

Selected node glides into focus

↓

New related nodes appear

↓

Old related nodes become stars

↓

Connection lines softly redraw

---

Touch Radius

48 pt minimum

---

Missed Touch

Nothing flashes.

Nothing shakes.

No error.

---

Long Press

No special behavior.

---

Double Tap

Ignored.

---

Pinch

Ignored.

---

Pan

Ignored.

---

# 10. Keyboard Interaction

For desktop and accessibility.

Tab

Move between readable nodes.

---

Arrow Keys

Move to nearby node.

---

Enter

Select.

---

Escape

Pause session.

---

Space

Toggle breathing animation.

---

Visible focus ring

Soft white glow.

Never blue browser default.

---

# 11. Reduced Motion Behavior

Respect operating system accessibility settings.

Changes

Particles disabled.

Slow floating disabled.

Scale animations removed.

Only opacity transitions remain.

Connection lines fade rather than animate.

Breathing indicator becomes a subtle pulse instead of expanding circles.

Lotus reveal becomes a gentle dissolve rather than a bloom animation.

Interaction timing remains consistent so users do not lose context.

---

# 12. Desktop Adaptation

Desktop should preserve the feeling of intimacy rather than expanding into a dense visualization.

## Layout

Maximum content width: 640 px.

The constellation remains centered within a generous canvas.

Additional screen space is used for atmosphere (mist, stars, reflections), not additional questions.

## Pointer Interaction

Hover softly increases glow by 10%.

No hover menus or tooltips.

Click behavior matches mobile tap behavior.

## Keyboard & Screen Reader

Full keyboard navigation is supported.

Readable node order follows the visual constellation rather than DOM insertion order.

---

# 13. Loading and Failure States

## Initial Loading

Display:

- animated night sky
- faint lake reflection
- slow breathing circle
- one emerging point of light

Avoid spinners or progress bars.

Typical transition: 1–2 seconds.

---

## Progressive Content Loading

If additional questions are still loading:

- ambient stars continue drifting
- existing nodes remain interactive
- new nodes fade in naturally when available

No blocking overlays.

---

## Offline Mode

If a local question library exists:

Continue seamlessly.

If no content is available:

Display a calm message:

> "This reflection space is unavailable right now. Please reconnect and try again."

Offer:

- Retry
- Return Home

---

## Audio Failure

If audio cannot initialize:

Continue silently.

Do not interrupt the session.

---

## Haptic Failure

Silently disable haptics.

No warning is shown.

---

# 14. Acceptance Tests

## Visual

- Only one full question is visible at any time.
- No more than three readable related nodes are displayed simultaneously.
- Total active nodes never exceed twelve.
- Ambient stars contain no readable text.
- No readable node overlaps another readable node.
- No node enters protected safe areas.

---

## Layout

- Vietnamese full questions fit without clipping using curated variants.
- English and Vietnamese layouts produce equivalent visual balance.
- Focus node remains visually stable between transitions.
- Related nodes remain within designated placement zones.

---

## Interaction

- A selected related node smoothly becomes the focused node.
- Previous focus gracefully dissolves into a historical star.
- Two or three related nodes are revealed after each selection.
- Users never need to pan, scroll, or zoom.
- Touch latency remains below 100 ms.

---

## Motion

- All transitions complete within the specified timing ranges.
- Reduced Motion mode removes non-essential movement while preserving clarity.
- Camera position never shifts.
- Historical stars fade naturally without distracting the user.

---

## Accessibility

- All interactive nodes meet the minimum touch target size.
- VoiceOver reads only the focused and readable related nodes.
- Keyboard navigation reaches every readable node.
- The experience remains fully usable with audio disabled, haptics disabled, and reduced motion enabled.

---

## Experience Integrity

At no point should the user perceive:

- a graph
- a network diagram
- a flowchart
- a dashboard
- a game board
- a technical visualization

The user should consistently experience the interface as a quiet constellation floating above a still lake, where each touch reveals another gentle invitation to observe rather than another item to complete.
