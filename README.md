# Washuta Family Year in Review

A beautiful, interactive year-in-review application showcasing family memories month by month.

## 🎨 Two Versions Available

This repository contains **two implementations** of the same concept:

### 1. **React Version** (Current/Main)
Modern React + Next.js implementation with Framer Motion animations.

**Tech Stack:**
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

**Features:**
- ✨ Smooth layout animations with Framer Motion
- 🎯 Morphing transitions between card and modal states
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js optimizations
- 🎨 Beautiful gradient text and modern UI
- 🖼️ Interactive gallery carousel in modals
- ♿ Accessible keyboard navigation

### 2. **Vanilla Version** (Legacy)
Lightweight vanilla JavaScript implementation.

**Tech Stack:**
- Plain HTML/CSS/JavaScript
- Tailwind CSS (via CDN)
- No build step required

**Location:** `vanilla-version/`

## 🚀 Getting Started (React Version)

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

## 📁 Project Structure

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
├── vanilla-version/             # Original vanilla implementation
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   └── logo.svg
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## 🎯 Customization

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

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- **Netlify:** Connect your repo and deploy
- **AWS Amplify:** Follow AWS deployment guide
- **Self-hosted:** Run `npm run build` and serve the `.next` folder

## 🔄 Switching to Vanilla Version

If you prefer the lightweight vanilla version:

```bash
cd vanilla-version
# Open index.html in your browser (or use a local server)
python3 -m http.server 8000
# Navigate to http://localhost:8000
```

## 📝 Notes

- Images are currently using placeholder services (Picsum Photos)
- Replace with your actual family photos before deploying
- The React version has a larger bundle size (~150KB) but provides smoother animations
- The vanilla version is ultra-lightweight (~10KB) but has simpler animations

## 🤝 Contributing

This is a family project, but feel free to fork and adapt for your own use!

## 📄 License

Personal/Family use only.

---

**Made with ❤️ for the Washuta Family**