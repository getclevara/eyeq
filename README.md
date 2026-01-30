# Eye Q Hawaii Website

A modern, professional website for Eye Q Hawaii optometry practice in Hilo. Built with React, Vite, and Tailwind CSS.

## Features

- **Interactive Services Section** - Expandable cards showing service details, duration, and booking CTAs
- **Education Hub** - Patient education content with expandable lessons
- **Smart Glasses Showcase** - Dedicated section for Meta Ray-Ban glasses
- **Sunglasses Collection** - Brand showcase with promotional offers
- **Booking Modal** - Integrated appointment request form
- **Mobile Responsive** - Fully responsive design with mobile navigation
- **Smooth Animations** - Polished transitions and hover effects

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3.4
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/eyeq-hawaii.git

# Navigate to project directory
cd eyeq-hawaii

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration (Recommended)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite and configures everything
6. Click "Deploy"

That's it! Vercel will:
- Build the project automatically
- Deploy to a `.vercel.app` URL
- Set up automatic deployments on every push to main

### Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `eyeqhawaii.com`)
4. Update your DNS records as instructed

## Project Structure

```
eyeq-hawaii/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Customization

### Colors

Edit `tailwind.config.js` to modify the color palette:

```js
colors: {
  ocean: {
    500: '#0ea5e9',  // Primary brand color
    // ...
  },
  sand: {
    // Warm accent colors
  }
}
```

### Content

All content is in `src/App.jsx`:
- `services` array - Eye care services
- `lessons` array - Educational content
- `brands` array - Eyewear brands

### Adding Real Images

Replace placeholder elements with actual images:

```jsx
// Hero image
<img 
  src="/images/office.jpg" 
  alt="Eye Q Hawaii office"
  className="rounded-3xl object-cover"
/>

// Doctor photo
<img 
  src="/images/dr-fernandez.jpg" 
  alt="Dr. Caron Fernandez"
  className="w-full h-full rounded-full object-cover"
/>
```

## Form Integration

The booking form currently doesn't submit anywhere. To make it functional:

### Option 1: Formspree
```jsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms
Add `netlify` attribute to form and deploy to Netlify.

### Option 3: Custom Backend
Connect to your own API endpoint.

## License

Private - Eye Q Hawaii

---

Built with care for Eye Q Hawaii, Hilo's trusted optometry practice.
