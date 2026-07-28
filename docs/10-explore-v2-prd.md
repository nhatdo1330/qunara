# Explore Page V2

Preserve the existing Explore navigation and layout. Add two sections after the
current investigations: Stories and Interactive Explorations.

## Stories

Stories create emotional connection through personal journeys, historical
moments, and community narratives. They are narratives rather than lessons.

- Three columns on desktop, two on tablet, one on mobile.
- Cards include a cover image, category, title, description, reading time, and
  open action.
- Visual direction: warm, editorial, minimal, rounded, and without heavy
  shadows.

## Interactive Explorations

Interactive Explorations help visitors experience ideas visually. They are
interactive experiences rather than articles.

- Three columns on desktop, two on tablet, one on mobile.
- Cards include a large illustration, title, one-sentence description,
  difficulty, estimated time, and open action.
- Visual direction: premium, minimal, illustration-led, and editorial.

## Content and routing

- Story cards are read automatically from `content/stories/` and link to
  `/stories/[slug]`.
- Interactive cards are read automatically from `content/interactive/` and link
  to `/interactive/[slug]`.
- Both sections support keyboard navigation, responsive layouts, dark mode, and
  reduced motion.
