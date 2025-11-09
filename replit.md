# Binary Babes: Decode Your Vibe

## Overview

Binary Babes is an AI-powered personality quiz application that generates shareable "vibe" cards based on user responses. It utilizes OpenAI's API to process answers, providing a playful personality breakdown with binary-coded traits, percentage-based personality dimensions, and a descriptive analysis. The project aims to offer an engaging, visually appealing, and shareable experience with a distinct cyber-tech aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend uses React 18+ with Vite, TypeScript, and `wouter` for client-side routing. State management is handled by React Query for server state and local React state for component-level logic. The UI is built with Shadcn/ui (based on Radix UI) and styled with Tailwind CSS, featuring a cyber-tech aesthetic with a bold red/white color scheme, custom fonts (Space Grotesk, Inter, JetBrains Mono), and enhanced animations. The quiz randomly selects 20 questions from a pool of 30, with randomized answer options, ensuring a unique experience per attempt. It includes comprehensive mobile responsiveness.

### Backend

The backend is built with Express.js and Node.js, using TypeScript. It provides API endpoints for:
- `POST /api/analyze`: Processes quiz answers using OpenAI GPT-4o-mini, validates input/output with Zod, and returns a structured personality analysis.
- `POST /api/share`: Accepts a base64 PNG image (generated client-side from the vibe card) to create a shareable record.
- `GET /api/share/:id/data`: Retrieves share data.
- `GET /share/:id/image.png`: Serves the shared PNG image.
- `GET /share/:id`: Serves an HTML page with Open Graph and Twitter Card meta tags for rich social media previews.

The AI integration uses GPT-4o-mini in JSON mode with a temperature of 0.8 and enhanced prompt engineering for creative, multi-dimensional profiles. Request size limits are set to 10MB to accommodate base64 image uploads. Error handling includes Zod validation, differentiated HTTP status codes (400 for validation, 500 for server errors), and retry logic.

### Data Storage

Currently, in-memory storage (`MemStorage` class) is used for quiz results (`QuizResult`) and shared vibes (`SharedVibe`). This provides no persistence between server restarts but an `IStorage` interface allows for future database integration.

### UI/UX Decisions

The application features a "sexier" UI with:
- **Hero component**: Pulsing red gradient orbs, gradient text, animated status indicators.
- **Quiz questions**: Smooth fade-in animations, staggered card delays, red selected states.
- **Progress bar**: Enhanced red percentage badge, improved typography.
- **Vibe card**: Thick red border, gradient backgrounds for top percentages, professional red-tinted shadow effects.
- **Binary badges**: Default variant (red background, white text) for impact.
- **Social share section**: Red-tinted gradient container with enhanced button styling and larger icons.
- **Animations**: Smooth transitions (300-500ms), hover scale effects, enhanced typography, professional shadow effects, and gradient text for headings.

## External Dependencies

- **AI Service**: OpenAI API (gpt-4o-mini model) for personality analysis.
- **Third-Party UI Components**:
    - Radix UI primitives for accessible, unstyled components.
    - Lucide React for icons.
    - html2canvas for client-side image generation from vibe cards.
- **Development Tools**: Replit-specific plugins, ESBuild for server-side bundling, and hot module replacement.