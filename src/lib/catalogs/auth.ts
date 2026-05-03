import type { CatalogData } from "./types";

export const authCatalog: CatalogData = {
  id: "auth",
  sections: [
    {
      id: "saas",
      resources: [
        { slug: "clerk", name: "Clerk", url: "https://clerk.com/", blurb: "Drop-in components + server-side helpers. Best DX for Next.js." },
        { slug: "auth0", name: "Auth0", url: "https://auth0.com/", blurb: "Enterprise-grade IdP, mature SAML/OIDC, broad SDK coverage." },
        { slug: "stytch", name: "Stytch", url: "https://stytch.com/", blurb: "Passwordless first; passkeys, SSO, B2B orgs out of the box." },
        { slug: "workos", name: "WorkOS", url: "https://workos.com/", blurb: "SSO, SCIM, Audit Logs as APIs — built for selling to enterprise." },
        { slug: "kinde", name: "Kinde", url: "https://kinde.com/", blurb: "Modern auth with feature flags + billing add-ons." },
        { slug: "privy", name: "Privy", url: "https://privy.io/", blurb: "Email/social login + embedded wallets (EVM + Solana). Best for web3." },
        { slug: "dynamic", name: "Dynamic", url: "https://www.dynamic.xyz/", blurb: "Multi-chain auth + wallet UI; alternative to Privy." }
      ]
    },
    {
      id: "open-source",
      resources: [
        { slug: "better-auth", name: "Better Auth", url: "https://www.better-auth.com/", blurb: "TypeScript-first OSS framework; OAuth, 2FA, orgs, magic links." },
        { slug: "next-auth", name: "Auth.js (NextAuth)", url: "https://authjs.dev/", blurb: "Long-standing OSS solution for Next.js / SvelteKit / Express." },
        { slug: "lucia", name: "Lucia", url: "https://lucia-auth.com/", blurb: "Light, customizable session library — bring your own DB." },
        { slug: "supabase-auth", name: "Supabase Auth", url: "https://supabase.com/auth", blurb: "Auth bundled with Supabase Postgres; RLS-friendly." },
        { slug: "keycloak", name: "Keycloak", url: "https://www.keycloak.org/", blurb: "Self-hostable enterprise IdP; SAML, OIDC, federated identity." },
        { slug: "ory", name: "Ory", url: "https://www.ory.sh/", blurb: "Headless IAM stack: Kratos (auth), Keto (perms), Hydra (OAuth)." }
      ]
    }
  ]
};
