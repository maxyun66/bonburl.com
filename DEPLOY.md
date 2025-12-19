# Vercel Deployment Guide

## 1. Prerequisites
- A GitHub/GitLab/Bitbucket account.
- A Vercel account.

## 2. Setup Vercel Postgres
Since Vercel is a serverless environment, local files (like SQLite) are read-only and will be lost after deployment. We have updated the configuration to use **PostgreSQL**.

1. **Push your code** to a Git repository.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and **Add New Project**.
3. Import your repository.
4. **Before clicking Deploy**:
   - Go to the **Storage** tab in your Vercel Project Dashboard (once created, or create the database first).
   - Click **Create Database** -> Select **Vercel Postgres**.
   - Follow the steps to create it.
   - Once created, go to the database settings and click **.env.local** tab.
   - Copy the environment variables.
   - Go back to your Project Settings -> **Environment Variables**.
   - Paste the variables automatically (or manually add `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`).

## 3. Deployment
1. Vercel will automatically run `npm install`, then `prisma generate` (via postinstall), then `next build`.
2. **Database Migration**:
   - You need to push your schema to the new cloud database.
   - You can do this from your local machine if you have the Vercel env vars in your local `.env`.
   - Run: `npx prisma db push` locally (after connecting to the remote DB).
   - OR: Add a build command in Vercel settings: `npx prisma db push && next build`.

## 4. Admin User
After deployment, your database will be empty. You need to create an initial admin user.
You can use the Vercel Postgres "Query" tab to run SQL, or create a seed script.

### SQL to create admin:
```sql
INSERT INTO "AdminUser" ("id", "username", "password", "createdAt") 
VALUES ('admin-id', 'admin', 'admin123', NOW());
```
(Make sure to change the password immediately after login)
