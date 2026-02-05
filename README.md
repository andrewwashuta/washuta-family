# Washuta Family Year in Review

A beautiful, interactive year-in-review application showcasing family memories month by month.

## Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

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
   Place your MNKY Banana Grotesk font files in `public/fonts/`:
   - `mnkybananagrotesk-regular.woff`
   - `mnkybananagrotesk-medium.woff`

   Or update `app/globals.css` to use different fonts.

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
│   │   └── YearInReview.tsx    # Main component
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles + fonts
├── public/
│   └── fonts/                   # Font files (add your own)
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

Option 1: Use your own fonts (current setup)
- Add `.woff` files to `public/fonts/`
- Update paths in `app/globals.css`

Option 2: Use Google Fonts
- Remove font-face declarations in `app/globals.css`
- Add Google Fonts import in `app/layout.tsx`

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
