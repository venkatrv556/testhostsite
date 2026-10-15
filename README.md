# My Free App

A fully free starter: HTML/CSS frontend + Node.js API on Vercel + Neon Postgres database.

```
my-free-app/
  index.html      page with a form and a list
  style.css       styling
  script.js       calls the API with fetch
  api/
    users.js      API: GET /api/users, POST /api/users
  schema.sql      table to create in Neon
  package.json
  .env.example    shows the DATABASE_URL format
  .gitignore
```

## Setup steps

### 1. Create the database (Neon)
1. Sign up at https://neon.com (no credit card needed).
2. Click **New Project**, pick the region nearest you.
3. Open **SQL Editor**, paste the contents of `schema.sql`, and run it.
4. Click **Connect** and copy the connection string (show the password first).

### 2. Put the project on GitHub
1. Create a new repository on github.com.
2. Upload these files (or use git). Do NOT upload a `.env` file.

### 3. Deploy on Vercel
1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New > Project** and choose your repository.
3. Before deploying, open **Environment Variables** and add:
   - Name: `DATABASE_URL`
   - Value: your Neon connection string
4. Click **Deploy**.

Your site is live at `https://your-project.vercel.app`.

## Test locally (optional)
1. Install Node.js from https://nodejs.org
2. In this folder run:
   ```
   npm install
   npm i -g vercel
   cp .env.example .env     (then edit .env and paste your real string)
   vercel dev
   ```
3. Open http://localhost:3000

## Free plan notes
- Vercel Hobby is for personal, non-commercial projects only.
- Neon free plan has monthly storage/compute limits; the database stops until next month if you exceed them (you are not charged).
- Keep your connection string secret. If it leaks, reset the password in Neon.
