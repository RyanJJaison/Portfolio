---
name: Ryan Joseph Jaison Portfolio
description: CS student building practical AI/ML systems.
colors:
  ink-green: "#1f5c45"
  pale-green: "#cfe3d6"
  stone-paper: "#efeee9"
  stone-surface: "#e4e2db"
  ink: "#161614"
  graphite: "#6e6c66"
  pencil-line: "#d6d4cc"
  risk-orange: "#d9480f"
typography:
  display:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 11vw, 10rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  display-accent:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  highlight: "0.15em"
  field: "0.75rem"
  card: "1rem"
  pill: "999px"
spacing:
  gutter: "24px"
  grid-gap: "24px"
  card-pad: "32px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.ink-green}"
    textColor: "{colors.stone-paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1rem"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone-paper}"
  tag-live:
    backgroundColor: "{colors.pale-green}"
    textColor: "{colors.ink-green}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.65rem"
  tag-static:
    backgroundColor: "{colors.stone-surface}"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.65rem"
  card:
    backgroundColor: "{colors.stone-surface}"
    rounded: "{rounded.card}"
    padding: "32px"
  input:
    backgroundColor: "{colors.stone-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  nav-link-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.65rem"
---

# Design System: Ryan Joseph Jaison Portfolio

## Overview

**Creative North Star: "The Field Notebook"**

The site reads like a working researcher's notebook: stone-coloured paper, green ink, hard ruled lines, and every entry indexed. Sections open with a parenthesised mono index such as `(01)`, figures carry `Fig. 01` captions, and projects sit in a ledger rather than a grid of cards. The structure is technical and exact; the character comes from craft details that reward attention, like the self-portrait drawn in binary digits, lines that draw themselves out of the portrait, and a contact letter that folds into a paper plane.

The mood is technical, crafted, and playful. Heavy, tight sans display type carries the confidence, and single italic serif words in green ink add warmth, as if annotated by hand. Playfulness lives in motion and small interactions, never in colour noise or decoration: the palette stays to one ink green on stone, and the layout stays on a strict 12-column grid.

This is explicitly not a template developer portfolio. No dark-mode neon gradients, glassmorphism, tech-logo walls, or skill-percentage bars.

**Key Characteristics:**
- Stone paper background with near-black ink and a single ink-green accent.
- Heavy Inter Tight display (800, line-height 0.92) with italic Instrument Serif accent words.
- Small uppercase JetBrains Mono labels for indexes, nav, captions, and tags.
- Hard 1px ink rules divide sections; soft pencil lines divide rows.
- Fully rounded pill buttons and tags; flat tonal cards.
- Motion that draws, reveals, and assembles, all disabled under reduced motion.

## Colors

One ink, one paper, one green pen: a restrained, warm-neutral palette where the green carries all emphasis.

### Primary
- **Ink Green** (#1f5c45): The pen colour. Italic serif accent words in display titles, section indexes, the full-stop dot after page titles, primary-button hover fill, live status dots, link and focus emphasis. Dark enough to read as text on Stone Paper.
- **Pale Green** (#cfe3d6): The highlighter. Text selection, hover highlights behind links (`.hl`), live/ongoing tag fills, the active step in scroll scenes. Always under Ink or Ink Green text, never as text itself.

### Tertiary
- **Risk Orange** (#d9480f): Reserved for data meaning: risk heat in the SentriX PageRank demo and form error messages. Never decorative.

### Neutral
- **Stone Paper** (#efeee9): Page background and text on ink fills.
- **Stone Surface** (#e4e2db): Cards, bento tiles, static tags, mobile menu button. Depth comes from this tonal step, not from shadow.
- **Ink** (#161614): Body text, display type, hard section rules, primary button fill, active nav pill.
- **Graphite** (#6e6c66): Secondary text, captions, taglines, inactive nav, field labels.
- **Pencil Line** (#d6d4cc): Soft row dividers inside lists and ledgers, input borders.

### Named Rules
**The One Pen Rule.** Ink Green is the only accent. Emphasis comes from green ink or a pale-green highlight, never from a second hue.

**The Data-Only Orange Rule.** Risk Orange appears only where it encodes meaning (risk, error). If it is decorating, remove it.

## Typography

**Display Font:** Inter Tight (with system-ui, sans-serif)
**Accent Font:** Instrument Serif, italic only (with Georgia, serif)
**Body Font:** Inter (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** A heavy, tightly tracked grotesk does the talking; one italic serif word per title, set in Ink Green, reads like a handwritten annotation in the margin. Mono caps keep the notebook's index-and-caption scaffolding precise.

### Hierarchy
- **Display** (800, clamp(3.5rem, 11vw, 10rem), 0.92): Inner-page titles in `PageShell`, followed by the green full-stop dot. Home hero uses clamp(3.5rem, 7.6vw, 7.5rem).
- **Headline** (800, 3rem to 4.5rem, 0.92): Section heads, set beside a mono index on the 12-column grid.
- **Title** (800, 2.25rem to 3rem, 0.92): Ledger project titles, mobile menu items, card headings.
- **Body** (400, 1.125rem, 1.375 to 1.625): Leads and taglines; leads cap at about 42rem (`max-w-2xl`). Small print at 0.875rem in Graphite.
- **Label** (400, 0.72rem, 0.06em tracking, uppercase): Indexes like `(01)`, nav, captions (`Fig. 01 — …`), tags, button text, field labels.

### Named Rules
**The One Italic Word Rule.** A display title gets at most one italic serif word or fragment, in Ink Green. It is the annotation, not the headline.

**The Mono Scaffold Rule.** Indexes, captions, labels, and controls are always mono caps. Body copy never is.

## Layout

A 12-column grid inside a 1280px container (`max-w-7xl`) with a 24px side gutter and 24px column gap. Section heads split 2 / 7 / 3 columns: mono index, display title, right-aligned mono note. Inner pages share `PageShell`: kicker, huge title, lead in 7 columns, aside right-aligned in columns 9 to 12, then content under a hard ink rule.

Lists are ledgers: rows separated by Pencil Lines, headed by an ink rule and mono column labels. Below 768px (`NARROW`), wide composited scenes (hero stage, orbit graph, scroll scenes) switch to stacked layouts rather than scaling down; only the current scroll step shows. Vertical rhythm is generous: pages pad 40px top and 96px bottom; rows pad 24px.

**The Ruled Page Rule.** Major divisions are a 1px Ink rule; minor divisions are a 1px Pencil Line. No other dividers.

## Elevation & Depth

Flat by default. Depth comes from the tonal step between Stone Paper and Stone Surface and from ruled lines. Shadow appears only as a response to hover on interactive cards, paired with a 3px lift.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 10px 30px -18px rgb(22 22 20 / 0.45)`): Linked cards and `.card.lift` on hover only.
- **Paper plane** (`filter: drop-shadow(0 6px 6px rgb(22 22 20 / 0.18))`): The contact form's flying plane only.

**The Flat-At-Rest Rule.** Nothing casts a shadow at rest. If a surface needs separation, use Stone Surface or a rule.

A faint fractal-noise paper grain sits behind the home hero only and fades out downward.

## Shapes

Two shape families. Controls and tags are fully rounded pills (999px). Containers are gently rounded: cards at 16px, form fields at 12px. Link highlights use a tiny 0.15em radius so the pale-green highlighter hugs the text. Rules and the grid stay square. Small circles recur as markers: the green full-stop dot after titles, live dots, graph nodes.

## Components

Tactile and confident: solid ink fills that turn green on hover, pills that press in, rows that slide on hover.

### Buttons
- **Shape:** Full pill (999px), mono caps label, padding 0.55rem 1rem.
- **Primary:** Ink fill, Stone Paper text. Hover turns the fill Ink Green.
- **Outline:** 1px Ink border, transparent fill. Hover fills Ink with Stone Paper text.
- **Active:** Scales to 0.97 on press. Arrow glyphs (→, ↗, ✈) end labels to show direction.

### Chips (Status Tags)
- **Style:** Small pill (0.25rem 0.65rem), mono caps.
- **State:** Ongoing uses Pale Green fill, Ink Green text, and a pulsing live dot. Every other status (Completed, Research proposal, Collaboration, Learning project, Planned) uses Stone Surface fill, Graphite text, and a static Graphite dot. Every project shows one.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Stone Surface; the active step in scroll scenes switches to Pale Green.
- **Shadow Strategy:** Flat at rest; hover lift per Elevation.
- **Border:** None.
- **Internal Padding:** 24px to 32px (20px in compact scene steps).

### Inputs / Fields
- **Style:** Stone Paper fill inside a Stone Surface card, 1px Pencil Line border, 12px radius, 12px 16px padding. Mono caps label above in Graphite.
- **Focus:** Border shifts to Ink Green; no glow.
- **Error:** Message in Risk Orange in the status line beside the submit button; typed content is kept.

### Navigation
- **Style:** Sticky bar on Stone Paper with an Ink bottom rule. Wordmark in heavy display with "Jaison" in italic serif green. Status pill with live dot from 1024px.
- **Links:** Small mono-caps pills prefixed with a two-digit index. Active: Ink fill, Stone Paper text. Hover: Stone Surface fill.
- **Mobile:** "Menu +" pill opens a ruled list of display-size links with mono indexes.

### Ledger
The project index. Mono column header over an Ink rule; each row holds index, display title with tagline, status tag, and stack joined by slashes. Hover slides the title 8px right, shows a green arrow, and highlights the title in Pale Green.

### Section Head
Ink rule on top, parenthesised mono index in Ink Green at left, display title in the middle, right-aligned mono note.

### Signature pieces
- **Binary portrait:** the hero self-portrait drawn in binary digits, captioned as a figure, with bezier lines drawing out to the interest list.
- **Paper-plane send:** on success the contact card folds and a paper plane flies off along a dashed Ink Green trail.

## Do's and Don'ts

### Do:
- **Do** keep Ink Green (#1f5c45) as the single accent, and Pale Green (#cfe3d6) only as a highlight fill under dark text.
- **Do** open sections with an Ink rule and a parenthesised mono index such as `(01)`.
- **Do** caption figures and demos in mono caps (`Fig. 01 — …`).
- **Do** end page titles with the green full-stop dot and use at most one italic serif word per title.
- **Do** use pills for every button, tag, and nav link; cards at 16px radius.
- **Do** make motion draw, reveal, or assemble content, and disable it fully under `prefers-reduced-motion`.
- **Do** switch wide composited scenes to stacked layouts below 768px.

### Don't:
- **Don't** build a template developer portfolio look: no dark-mode neon gradients, glassmorphism, tech-logo walls, or skill-percentage bars.
- **Don't** add a second accent hue; Risk Orange (#d9480f) is for risk data and errors only.
- **Don't** put shadows on surfaces at rest.
- **Don't** set body copy in mono caps or labels in the serif.
- **Don't** hard-code copy in components; it lives in `content/*.ts`.
