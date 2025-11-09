# Binary Babes: Decode Your Vibe - Design Guidelines

## Design Approach

**Reference-Based**: Inspired by 16Personalities + BuzzFeed quizzes with cyber/tech aesthetics, now amplified with bold red/white contrast for a striking, energetic personality. Focus on shareability, confident visual identity, and attention-grabbing design.

**Core Principles**:
1. **Fiery Cyber Identity**: Tech-inspired with passionate red accents and crisp white foundations
2. **High-Contrast Drama**: Bold red (#DC2626/red-600 primary, #EF4444/red-500 accents) against pure white (#FFFFFF) and near-black (#0A0A0A) for text
3. **Shareable-First**: Results screens designed for screenshot appeal with striking color combinations
4. **Progressive Energy**: Build anticipation through quiz flow with color intensity

## Color System

**Primary Palette**:
- **Passion Red**: #DC2626 (red-600) - Primary actions, accents, emphasis
- **Vibrant Red**: #EF4444 (red-500) - Hover states, secondary emphasis
- **Deep Red**: #B91C1C (red-700) - Dark mode accents, borders
- **Pure White**: #FFFFFF - Backgrounds, cards, clean space
- **Soft White**: #F9FAFB (gray-50) - Subtle backgrounds, alternate sections
- **Coal Black**: #0A0A0A - Primary text, high contrast
- **Charcoal**: #374151 (gray-700) - Secondary text
- **Light Gray**: #E5E7EB (gray-200) - Borders, dividers

**Application Strategy**:
- Hero backgrounds: White with red gradient overlays or red with white text
- Cards: White backgrounds with red borders/accents
- Buttons: Red backgrounds with white text, white borders with red text (secondary)
- Progress bars: Red fill on light gray track
- Binary code badges: Red background with white text, or white background with red border
- Vibe card: White card with bold red percentage displays and red accent lines

## Typography

**Font Stack** (Google Fonts CDN):
- **Space Grotesk** (700, 500): Headings, confident and modern
- **Inter** (400, 500): Body text, clean readability  
- **JetBrains Mono** (400): Binary codes, monospace tech feel

**Hierarchy**:
- Hero: text-5xl md:text-7xl font-bold (Space Grotesk)
- Sections: text-3xl md:text-4xl font-bold
- Quiz questions: text-2xl md:text-3xl font-medium
- Body: text-base md:text-lg (Inter)
- Binary codes: text-sm font-mono (JetBrains Mono)
- CTAs: text-lg font-medium uppercase tracking-wide

## Layout System

**Spacing**: Tailwind units 2, 4, 6, 8, 12, 16, 20, 24
- Small gaps: 2-4
- Component spacing: 6-8
- Section padding: py-16 md:py-24
- Container: max-w-7xl mx-auto px-6

## Page Structure

### Landing Page (6 Sections)

**1. Hero** (min-h-screen with image background):
- Full-width hero image: Modern tech/cyber aesthetic with red lighting/accents
- Dark overlay (bg-black/40) for text readability
- Centered content with backdrop-blur-sm on text container
- Headline: "Decode Your Binary Vibe ✨" (white text, text-6xl md:text-7xl)
- Subheading: "AI-powered personality analysis in binary code" (white/90)
- Primary CTA: Large red button with white text, backdrop-blur-md background
- Supporting text: "2 minutes • AI-powered • Share your vibe"
- Floating binary code elements (decorative, red/white, low opacity)

**2. How It Works** (white background):
- 3-column grid (grid-cols-1 md:grid-cols-3)
- Each step: Heroicons icon in red, bold title, description
- Icons: w-12 h-12 in red stroke
- Cards with subtle hover lift effect

**3. Sample Vibe Preview** (soft gray background):
- 2-column layout (grid-cols-1 lg:grid-cols-2)
- Left: Large mockup vibe card (white card, red accents, visible percentages)
- Right: Explanation text with red highlights on key terms
- Binary code examples as red badges

**4. Features Grid** (white background):
- 3 feature cards in grid (grid-cols-1 md:grid-cols-3)
- Each card: white with red border-l-4, icon, title, description
- "AI-Powered" • "Unique Binary" • "Social Ready"

**5. Social Proof** (soft gray background):
- Centered testimonial carousel or static 3-column testimonial cards
- User quotes with red quotation marks, names in red
- Avatar placeholders with red borders

**6. Final CTA** (white background):
- Bold centered headline: "Ready to Decode Your Vibe?"
- Large red primary button
- Supporting text: "Join thousands discovering their binary personality"
- Decorative binary pattern background (subtle, red/10 opacity)

### Quiz Flow Page

**Layout**: Centered card (max-w-3xl), white background
- Red progress bar at top (h-2, rounded-full, bg-gray-200 track)
- Question counter in red
- Large question text (text-2xl md:text-3xl, font-medium)
- Answer cards: grid-cols-1 md:grid-cols-2, gap-4
- Each card: white, border-2 border-gray-200, hover:border-red-500, rounded-2xl, p-6
- Selected state: border-red-600, bg-red-50
- Navigation: Previous (ghost), Next (red primary)

### Results Page (Vibe Card)

**Shareable Card** (max-w-3xl, centered):
- White card with red border-4, rounded-3xl, p-8 md:p-12, shadow-2xl
- Header: "Your Binary Vibe" with red underline accent
- Percentage breakdown:
  - "70% Chaotic Genius" (text-5xl font-bold text-red-600) with emoji
  - "20% Soft Philosopher" (text-4xl font-medium text-red-500)
  - "10% Menace" (text-3xl text-red-400)
- Binary badges grid: Red background, white text, rounded-lg, font-mono
- AI description: 2-3 paragraphs, key traits highlighted in red
- Footer: Small binary pattern, "Binary Babes" branding

**Below Card**:
- Share buttons: Red outlined, icons from Heroicons
- "Retake Quiz" (white with red border)
- "Analyze a Friend" (red primary)

## Component Library

**Buttons**:
- Primary: bg-red-600 text-white, px-8 py-4, rounded-full, hover:bg-red-700
- Secondary: border-2 border-red-600 text-red-600, hover:bg-red-50
- Ghost: text-red-600 underline-offset-4 hover:underline
- Hero buttons: backdrop-blur-md bg-red-600/90 (over images)

**Cards**:
- Quiz: border-2 border-gray-200 bg-white rounded-2xl hover:border-red-500 transition-colors
- Vibe: border-4 border-red-600 bg-white rounded-3xl shadow-2xl
- Feature: border-l-4 border-red-600 bg-white rounded-lg

**Progress**:
- Bar: bg-gray-200 rounded-full h-2, fill with bg-red-600
- Percentage circles: Red stroke with white fill

**Badges**: 
- bg-red-600 text-white px-3 py-1 rounded-lg font-mono text-sm
- Alternate: border-2 border-red-600 text-red-600 bg-white

**Icons**: Heroicons outline, red-600 stroke, w-6 h-6 inline, w-12 h-12 features

## Images

**Hero Section**: Full-width background image required
- Description: Modern cyber/tech workspace or abstract digital pattern with dominant red lighting/accents (neon red, digital interfaces, futuristic aesthetic)
- Treatment: Dark overlay (bg-black/40), text with backdrop-blur
- Positioning: object-cover, fixed or absolute
- Mood: Energetic, modern, tech-forward with red color grading

**Vibe Card Preview**: HTML-designed mockup (no external image needed)
- Show example card with visible red percentages and binary codes

**No other images required** - design relies on typography, color contrast, and generated cards

## Animations

Minimal, polished:
- Quiz transitions: Fade + slight slide (duration-300)
- Button hovers: Scale (scale-105), subtle shadow increase
- Progress bar: Smooth width transition
- Card hovers: Border color transition, subtle lift (translate-y-1)
- Hero: Subtle floating binary code elements (optional, very gentle)

## Accessibility

- Text contrast: All text meets WCAG AA (white on red-600, black on white)
- Focus rings: ring-2 ring-red-500 ring-offset-2
- Keyboard navigation: Full quiz completion via keyboard
- Touch targets: minimum 44x44px
- Alt text for all decorative elements

## Responsive

- Mobile-first breakpoints: sm, md, lg, xl
- Hero text: text-5xl → text-7xl
- Grid layouts: cols-1 → cols-2/3 at md/lg
- Section padding: py-12 → py-24
- Vibe card padding: p-6 → p-12
- Stack all multi-column layouts on mobile

## Special Notes

**Shareable Vibe Card**: Designed for Instagram/Twitter screenshots - must be visually striking, self-contained, and instantly recognizable with bold red percentages and clean white background.

**Red Usage**: Use red decisively for emphasis - percentages, CTAs, progress, accents. Don't dilute impact by overuse. White space is equally important for contrast.

**Binary Aesthetic**: Integrate binary codes as red/white badges and subtle decorative patterns. Keep tech feel modern and accessible, not overwhelming.