---
name: Shakambhari Dry Fruits and Foods
description: Discover premium quality dry fruits, nuts, and exotic foods at Shakambhari.
colors:
  primary: "#d4af37"
  primary-light: "#f3d56a"
  primary-dark: "#aa8925"
  neutral-bg: "#0a0a0c"
  neutral-surface: "#131316"
  neutral-surface-high: "#1c1c20"
  neutral-text: "#f8f8f8"
  neutral-text-muted: "#b3b3b3"
typography:
  display:
    fontFamily: "'Playfair Display', serif"
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: "'Playfair Display', serif"
    fontWeight: 600
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
  title:
    fontFamily: "'Playfair Display', serif"
    fontWeight: 600
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
  body:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  md: "16px"
  full: "50px"
spacing:
  btn-padding: "0.8rem 2rem"
  grid-gap: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.full}"
    padding: "{spacing.btn-padding}"
  button-outline:
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "{spacing.btn-padding}"
---

# Design System: Shakambhari Dry Fruits and Foods

## Overview

**Creative North Star: "The Everyday Nutritionist"**

This system emphasizes health, approachability, and daily wellness without losing the inherent premium quality of the products. The design uses a deep, dark canvas to let the warmth of gold accents stand out, reflecting a high-quality nutritional focus. The UI feels tactile, warm, and inviting.

**Key Characteristics:**
- Deep, immersive dark mode aesthetic.
- Warm gold accents for high-contrast interactive elements.
- Soft, highly rounded interactive elements for a friendly and approachable feel.
- Clean and legible typography balancing an elegant serif display with a modern sans-serif body.

## Colors

A rich, dark canvas illuminated by warm gold.

### Primary
- **Nutritionist Gold** (#d4af37): The main accent color for buttons, active tabs, and highlights. Used to convey premium quality and warmth.
- **Light Gold** (#f3d56a): Hover state for the primary buttons.
- **Deep Gold** (#aa8925): Darker accent for borders or deeper contrast.

### Neutral
- **Deep Background** (#0a0a0c): The main page background.
- **Surface** (#131316): Slightly lighter background for cards and panels.
- **Surface High** (#1c1c20): Elevated surface for card backs or active elements.
- **Primary Text** (#f8f8f8): High-contrast reading text.
- **Secondary Text** (#b3b3b3): Muted text for leads and inactive tabs.

### Named Rules
**The Warm Glow Rule.** Accent color (gold) is used sparingly to guide the eye toward action. It provides warmth in an otherwise dark environment.

## Typography

**Display Font:** Playfair Display (with serif)
**Body Font:** Inter (with sans-serif)

**Character:** A pairing of classic elegance (Playfair) with crisp modern utility (Inter).

### Hierarchy
- **Display** (600, clamp(3rem, 6vw, 5.5rem), 1.2): Main hero text, expressive and large.
- **Headline** (600, clamp(2rem, 4vw, 3.5rem), 1.2): Section titles.
- **Title** (600, clamp(1.5rem, 3vw, 2.5rem), 1.2): Product titles or smaller section headers.
- **Body** (400, 1rem, 1.6): All readable paragraph content.

## Layout

A centered max-width container (`1300px`) with ample horizontal padding (`2rem`). The grid structure for products uses responsive fluid columns (`minmax(280px, 1fr)`) with a generous `2.5rem` gap to let images breathe.

## Elevation & Depth

Flat at rest, glowing on interaction. 

### Shadow Vocabulary
- **Hover Glow** (`0 0 25px rgba(212, 175, 55, 0.15)`): Applied to interactive cards (e.g., flip cards) when hovered, giving a tactile, premium lift.

### Named Rules
**The Flat-by-Default Rule.** Elements stay flat against the dark background but emit a subtle gold glow when the user interacts with them.

## Shapes

Highly rounded, approachable forms. Buttons and tabs use fully rounded pill shapes (`50px`), while structural cards use a soft, modern radius (`16px`).

## Components

Tactile, warm, and inviting components with smooth transitions.

### Buttons
- **Shape:** Pill (50px)
- **Primary:** Gold background with dark text. Emits a subtle box shadow on rest, lifts slightly and glows more on hover.
- **Outline:** Transparent background with a gold border and text. Fills with a slight gold tint on hover.

### Flip Cards
- **Corner Style:** 16px
- **Background:** Surface (#131316) on front, Surface High (#1c1c20) on back.
- **Shadow Strategy:** Flat at rest, rotates 180deg and emits a glow on hover.

### Glass Panel
- **Style:** Semi-transparent dark background (`rgba(19, 19, 22, 0.7)`) with a `12px` backdrop blur and a very subtle white border. Used for the sticky navbar when scrolled.

## Do's and Don'ts

### Do:
- **Do** use the gold accent exclusively for primary actions and important active states.
- **Do** keep structural backgrounds dark to maintain the premium nutritionist aesthetic.

### Don't:
- **Don't** use sharp corners for interactive elements; stick to `50px` for buttons/tabs and `16px` for cards.
- **Don't** use permanent, heavy drop shadows on resting elements.
