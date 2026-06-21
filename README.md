# StoryCast - Climate Stories from Africa

A website showcasing stories documenting climate change impacts across Africa. The site features three main pages with full accessibility support, responsive design, and container queries.

- **Access the deployed Website from [here](https://hd77alu.github.io/storycast/)**

## Project Structure

```
storycast/
├── index.html              # Home page
├── about.html              # About & accessibility page
├── story/
│   └── main-story.html     # Story by NBC news
│   ├── famine-east-africa.html # Story by ABC news
│   ├── flooding-niger.html # Story by Channels Television
│   ├── seeds-malawi.html   # Story by switvh TV
├── sass/                   # Sass source files
│   ├── tokens/             # Design tokens
│   ├── components/         # Component styles
│   ├── pages/              # Page styles
│   └── main.scss           # Main import file
├── css/
│   └── main.css            # Compiled CSS
├── js/
│   └── main.js             # JavaScript
└── assets/                 # Media files
```

---

## Installation

1. **Clone/Download the project**
```bash
git clone https://github.com/hd77alu/storycast
cd storycast
```

2. **Compile Sass**
```bash
sass sass/main.scss css/main.css
```

3. **Start development server**
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# VS Code Live Server
# Right-click index.html → Open with Live Server
```

4. **View in browser**
```
http://localhost:8000
```
---

## Page Structure

**1. Home Page (index.html)**
- Hero section with featured story
- Stories grid (3 stories with container queries)
- Audio spotlight section
- Platform statistics

**2. Story Detail Page (story/drought-sahel.html)**
- Video hero with play button
- Story metadata and description
- Audio player with waveform visualization
- Expandable transcript with timestamps
- Related stories section

**3. About & Access Page (about.html)**
- Mission statement
- Why audio-first journalism
- 6 accessibility features grid
- WCAG 2.1 AA compliance details

---

## Accessibility Features (WCAG 2.1 AA)

1. **Semantic HTML5**
   - Proper heading hierarchy
   - `<article>`, `<section>`, `<nav>` elements
   - ARIA landmarks and labels

2. **Keyboard Navigation**
   - Tab order follows visual flow
   - Arrow keys for audio scrubbing
   - Space bar for play/pause
   - Focus indicators on all interactive elements

3. **Screen Reader Support**
   - Descriptive aria-labels
   - Hidden decorative elements with `aria-hidden`
   - SR-only text for context
   - Live regions for dynamic content

4. **Color Contrast**
   - Text: Minimum 7:1 (AAA level)
   - Interactive elements: Minimum 3:1
   - Focus indicators: 3:1 against background

5. **Transcripts**
   - Full timestamped transcripts for all media
   - Speaker identification
   - Downloadable formats

6. **Responsive Design**
   - Mobile-first approach
   - Touch targets minimum 44×44px
   - No horizontal scrolling

---

## Key Design Features

### Container Queries
Story cards use `@container` to adapt based on their container width, not viewport:
```scss
@container story-card (min-width: 500px) {
  .story-card__title { font-size: 1.4rem; }
}
```

### CSS Grid + Flexbox
- Grid for page layouts and story grids
- Flexbox for components and alignment
- Mobile-first with media queries

### Vanilla JavaScript
- Mobile menu toggle
- Audio waveform interaction
- Transcript accordion
- No frameworks or libraries

### Navigation (`_navigation.scss`)
- Fixed header with backdrop blur
- Responsive mobile menu
- Active state indicators
- Logo with icon

### Story Card (`_story-card.scss`)
**Container Query Breakpoint:** 500px
- **< 500px:** Compact, 2-line description
- **≥ 500px:** Expanded, 3-line description, larger title

### Audio Player (`_audio-player.scss`)
- Interactive waveform visualization
- Play/pause, skip controls
- Progress indicator
- Volume control
- Download link

### Media Tag (`_media-tag.scss`)
- Type indicator (audio/video)
- Category badge
- Icon + text combination

---

## Theme

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `$color-background` | #0C0E0D | Main background |
| `$color-foreground` | #F0EBE1 | Primary text |
| `$color-primary` | #C4622D | CTAs, highlights |
| `$color-accent` | #E8A040 | Links, active states |
| `$color-card` | #141714 | Elevated surfaces |
| `$color-secondary` | #1A2E23 | Section backgrounds |
| `$color-border` | rgba(240,235,225,0.09) | Dividers |

---

## Credits:
- Images: Unsplash
- Icons: Lucide
- Videos: NBC News, ABC News, Channels Television, Switch TV
