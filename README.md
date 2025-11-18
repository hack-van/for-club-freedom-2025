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

### Setting up Better Auth with Convex in your environment

1. Run pnpm install
2. Create the BETTER_AUTH_SECRET environment variable in your convex environment with the following command:
   `npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)`
3. Add your site url to your convex environment variables
   `npx convex env set SITE_URL http://localhost:3000`
   In prod, use the prod site url
4. Ensure you have NEXT_PUBLIC_CONVEX_SITE_URL and SITE_URL set in your .env.local file.

For more details, visit this [guide](https://convex-better-auth.netlify.app/framework-guides/next)

Whenever you want to make changes to the betterAuth schemas and components, run the following command

```
cd convex/betterAuth
npx @better-auth/cli generate -y --output generatedSchema.ts
```

Note: the betterAuth tables can be accessed under the betterAuth component in the convex dash board.

![betterAuth](./images/betterAuth_component.png)

### Setting up Resend

We are using [Resend](https://resend.com) as our email provider. You have to:

1. Register a resend account
2. Get an API key
3. Verify your domain.
4. Ensure the RESEND_API_KEY environment variable is set in your convex environment with the API key value.
   For more information, follow the instructions [here](https://www.convex.dev/components/resend) to set up resend in your convex environment
   We will need an official verified domain if we want our emails to not go to the spam folder.

### Creating Users

To access the admin create user page without being an admin, comment out the if condition in app\admin\createuser\page.tsx.

You must manually set the user's role in the betterAuth.users table.

![admin](./images/better_auth_admin_set.png)

### Set up R2 for Convex

To set up R2 for Convex, follow the instructions in the _Cloudflare Account_ section in the [Convex R2 documentation](https://www.convex.dev/components/cloudflare-r2#cloudflare-account).

### Development with HTTPS

Make sure you have [mkcert](https://github.com/FiloSottile/mkcert) installed to create a local CA and generate locally trusted certificates.

Then run the development server with HTTPS. If you are in Windows, use administrator mode

```bash
pnpm dev:https
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

Or you can access the server with your local network IP address, e.g. `https://<your-local-ip>:3000`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment variables

Copy the .env.example file as your .env file. Then edit it to include your api keys.

```bash
cp .env.example .env
```

## This project is using shadcn/ui and tailwindcss

This project is using [shadcn/ui](https://ui.shadcn.com/) and [tailwindcss](https://tailwindcss.com/) for building the UI components. You can find the components in the `components` folder.

To install the components, run the following command:

```
npx shadcn@latest add <component-name>
# or
pnpm dlx shadcn@latest add <component-name>

```

The list of available components can be found [here](https://ui.shadcn.com/docs/components/).

## Running Convex sync engine

```bash
npx convex dev
# or
pnpm convex dev
```

## Run any .ts file in isolation

`pnpm run_in_isolation -- path/to/your/file.ts`

## Convex Migrations

See this [migration](https://www.convex.dev/components/migrations) page for more details.

To run a single migration, use the following command:

`pnpx convex run migrations:run '{fn: "migrations:yourMigrationName"}'`
