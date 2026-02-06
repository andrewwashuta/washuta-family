# Washuta Family Year in Review

A beautiful, interactive year-in-review application showcasing family memories month by month.

## Tech Stack

- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Central Icons
- next-themes

## Features

- Smooth layout animations with Framer Motion
- Morphing transitions between card and modal states
- Fully responsive design
- Fast performance with Next.js optimizations
- Interactive gallery carousel in modals
- Accessible keyboard navigation

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add font files (optional):**
   Fonts are loaded from `fonts/` at the project root. The app uses ABC Marist and MNKY Banana Grotesk. Place your `.woff` / `.woff2` files there and update paths in `app/layout.tsx` if needed.

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
washuta-family/
├── app/
│   ├── components/
│   │   ├── YearInReview.tsx    # Main component
│   │   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   │   └── ThemeProvider.tsx   # Theme context
│   ├── layout.tsx               # Root layout (fonts, ThemeProvider)
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles + CSS variables
├── fonts/                       # ABC Marist, MNKY Banana Grotesk
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Customization

### Update Family Photos

Edit the `YEAR_DATA` array in `app/components/YearInReview.tsx`:

```typescript
const YEAR_DATA = [
  {
    id: 'january',
    month: 'January',
    year: '2024',
    title: 'Your Title',
    location: 'Your Location',
    description: 'Your description...',
    cover: 'path/to/cover-image.jpg',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'path/to/photo1.jpg', caption: 'Caption here' },
      // Add more photos...
    ]
  },
  // Add more months...
]
```

### Change Colors

Update `tailwind.config.ts` or modify classes in the component:
- Primary accent: `rose-500` → your color
- Background: `neutral-950` → your color
- Text: `neutral-100` → your color

### Fonts

Fonts are loaded via `next/font/local` in `app/layout.tsx`:
- ABC Marist (serif)
- MNKY Banana Grotesk (sans)

Place `.woff` / `.woff2` files in `fonts/` and update the paths in `layout.tsx` to use your own fonts.

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- **Netlify:** Connect your repo and deploy
- **AWS Amplify:** Follow AWS deployment guide
- **Self-hosted:** Run `npm run build` and serve the `.next` folder

## Notes

- Images are currently using placeholder services (Picsum Photos)
- Replace with your actual family photos before deploying

## License

Personal/Family use only.

---

**Made with love for the Washuta Family**
