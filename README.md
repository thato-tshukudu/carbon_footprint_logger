# Carbon Emissions Tracker

A web platform that lets users track daily activities contributing to carbon emissions, view summaries, and get tips to reduce their footprint.

## Features

- **Activity Logging**: Select or input daily activities with CO₂ values, running totals, visual summaries, and filtering by category while keeping the latest entries in localStorage if the live services are unreachable.
- **User Accounts & Dashboard**: Registration and login with MongoDB storage, personalized activity logs, total emissions summary, and community average comparison.
- **Insight Engine**: Analyze user activity for highest-emission categories, provide personalized tips and weekly goals.

## Tech Stack

- Frontend: React with Next.js App Router, Tailwind CSS
- Backend: Next.js API Routes, MongoDB with Mongoose
- Authentication: NextAuth.js
- Charts: Recharts
- Styling: Professional dark green palette with emerald highlights and resilient borders

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB:
   - Ensure MongoDB is running locally on `mongodb://localhost:27017/carbontracker`
   - Or update `MONGODB_URI` in `.env.local` for a different connection

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create `.env.local` from the example template:
```bash
cp .env.example .env.local
```

Then set values in `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/carbontracker
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

- `app/`: Next.js app directory with pages and API routes
- `components/`: Reusable React components
- `lib/`: Database models, utilities, and data
- `public/`: Static assets

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
