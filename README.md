# Club Freedom Testimonial Platform

A modern testimonial collection platform built for Club Freedom, allowing users to share their experiences through text, audio, or video recordings.

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) with [Vite](https://vite.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Backend**: [Convex](https://www.convex.dev/) - Real-time database and backend
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) - Media file storage
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with [Tailwind CSS](https://tailwindcss.com/)
- **AI**: Google Gemini - Text summarization and transcription
- **Deployment**: Cloudflare Pages (via Wrangler)

## Features

- 📝 Text-based testimonials
- 🎤 Audio recording with browser media recorder
- 🎥 Video recording with mobile and desktop support
- 🔍 Full-text search across testimonials
- 📱 Responsive design with mobile-first approach
- 🤖 AI-powered summarization using Google Gemini

## Getting Started

### Prerequisites

- Node.js 20+ and pnpm
- Convex account for backend
- Cloudflare account for R2 storage
- Google Gemini API key for AI features

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hack-van/for-club-freedom-2025.git
cd for-club-freedom-2025
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables (see Environment Variables section below)

4. Run the development server:

```bash
pnpm dev
```

5. In a separate terminal, start the Convex development server:

```bash
pnpm convex dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Set up R2 for Convex

To set up R2 for Convex, follow the instructions in the *Cloudflare Account* section in the [Convex R2 documentation](https://www.convex.dev/components/cloudflare-r2#cloudflare-account).


### Development with HTTPS

Make sure you have [mkcert](https://github.com/FiloSottile/mkcert) installed to create a local CA and generate locally trusted certificates.

Then run the development server with HTTPS. If you are in Windows, use administrator mode

```bash
pnpm dev:https
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Convex
CONVEX_DEPLOYMENT=<your-convex-deployment-url>
VITE_CONVEX_URL=<your-convex-url>

# Cloudflare R2
R2_ACCOUNT_ID=<your-cloudflare-account-id>
R2_ACCESS_KEY_ID=<your-r2-access-key>
R2_SECRET_ACCESS_KEY=<your-r2-secret-key>
R2_BUCKET_NAME=<your-bucket-name>

# Google Gemini
GOOGLE_GEMINI_API_KEY=<your-gemini-api-key>
```

## Project Structure

```
├── app/                    # TanStack Router application
│   ├── routes/            # Route components
│   │   ├── index.tsx     # Home page (testimonial form)
│   │   ├── admin/        # Admin dashboard
│   │   └── testimonials/ # Testimonial detail pages
│   └── router.tsx        # Router configuration
├── components/            # React components
│   ├── form/             # Form components
│   ├── recorder/         # Audio/video recorder components
│   └── ui/               # shadcn/ui components
├── convex/               # Convex backend
│   ├── schema.ts         # Database schema
│   ├── testimonials.ts   # Testimonial queries/mutations
│   ├── media.ts          # Media handling
│   └── r2.ts             # R2 storage integration
├── gemini/               # Google Gemini integration
│   └── summarize_text.ts # Text summarization
└── lib/                  # Utility functions
```

## Using shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/) for building UI components.

To add new components:

```bash
pnpm dlx shadcn@latest add <component-name>
```

Available components: https://ui.shadcn.com/docs/components/

## Running Convex Backend

The Convex backend provides real-time database, file storage, and serverless functions.

Start the Convex development server:

```bash
pnpm convex dev
```

Deploy to production:

```bash
pnpm convex deploy
```

## Running Isolated Scripts

To run any TypeScript file in isolation:

```bash
pnpm run_in_isolation -- path/to/your/file.ts
```

## Building for Production

Build the application:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Deployment

This application is configured for deployment on Cloudflare Pages using Wrangler.

1. Configure your Cloudflare account in `wrangler.jsonc`
2. Deploy using Wrangler:

```bash
pnpm wrangler pages deploy
```

## Learn More

- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [Convex Documentation](https://docs.convex.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)

## License

This project is private and intended for Club Freedom use.
