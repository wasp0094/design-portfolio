This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Password-gated case studies

Some work is under NDA. A study can be split in two by adding a `gated` key to
its `study` object in `lib/data.ts`:

- `/work/<slug>` — the public short version. Renders each section's `blocks`.
- `/work/<slug>/full` — the detailed version. Renders `blocks` + `more` for
  every section, plus the full screen gallery, once the password is entered.

The check runs on the server (`lib/gate.ts`), so gated content is never sent to
the browser unless the reader has unlocked it. Access is stored in an
HMAC-signed, httpOnly cookie that lasts 30 days.

Set the password in `.env.local` (gitignored):

```
CASE_STUDY_PASSWORD=your-password-here
```

Set the same variable in your host's environment for production. **If the
variable is missing the gate stays shut** rather than failing open.

### Placeholder images

Any `figure`, `figures` item, or `compare` block can be marked
`placeholder: true`. It renders a loud "Placeholder" badge and desaturates the
image, so a borrowed screen standing in for a real export can't be mistaken for
finished work.
