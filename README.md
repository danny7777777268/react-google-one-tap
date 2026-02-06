# React Google One Tap

Minimal, dependency-free **Google One Tap** sign-in component for React applications.

Designed for **startups, SaaS products, and production systems** that need fast, secure Google authentication with minimal setup.

✔ Automatically loads Google Identity Services  
✔ Works with **React**,**CRA**, **Vite**, **Next.js (client-side)**  
✔ No build step, no bundler required  
✔ Backend-agnostic (works with any stack)  
✔ Lightweight, auditable, and secure  

---


## Repository

Source code and issues are available on GitHub:

🔗 https://github.com/danny7777777268/react-google-one-tap

---

## Why This Package

Modern products need **frictionless authentication**. Google One Tap significantly improves sign-in conversion, especially on mobile and returning users.

This package focuses on:
- **Performance** – zero extra dependencies
- **Security** – tokens are never stored on the client
- **Simplicity** – 1 component, 2 required props
- **Control** – backend verification is fully yours

Ideal for:
- SaaS platforms
- AI & fintech startups
- Marketplaces
- Consumer apps
- Enterprise dashboards

---

## Installation

Using npm:

```bash
npm install react-google-one-tap-stockbase-pro

or 

yarn add react-google-one-tap-stockbase-pro

Usage

import GoogleOneTap from "react-google-one-tap-stockbase-pro";

export default function App() {
  return (
    <>
      <GoogleOneTap
        clientId="YOUR_GOOGLE_CLIENT_ID"
        authUrl="https://yourdomain.com/api/auth/google"
        onSignedIn={(data) => {
          console.log("Signed in user:", data.user);
        }}
      />
    </>
  );
}

Pros

| Prop                 | Type       | Required | Description                                |
| -------------------- | ---------- | -------- | ------------------------------------------ |
| `clientId`           | `string`   | ✅        | Google OAuth Client ID                     |
| `authUrl`            | `string`   | ✅        | Backend endpoint to verify Google ID token |
| `onSignedIn`         | `function` | ❌        | Callback after successful authentication   |
| `headers`            | `object`   | ❌        | Custom headers for the auth request        |
| `autoSelect`         | `boolean`  | ❌        | Automatically sign in returning users      |
| `cancelOnTapOutside` | `boolean`  | ❌        | Prevent dismissal when clicking outside    |


use this backend example case for node js

Backend Example (Node.js / Express)

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

    app.post("/api/auth/google", async (req, res) => {
          try {
              const { credential } = req.body;
              if (!credential) return res.status(400).json({ error: "Missing credential" });

              // Verify Google ID token on server
              const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID, // must match your web client id
              });

              const payload = ticket.getPayload();
              if (!payload) return res.status(401).json({ error: "Invalid token payload" });

              // Typical fields:
              // payload.sub (unique user id), payload.email, payload.name, payload.picture, payload.email_verified
              const user = {
                googleId: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                emailVerified: payload.email_verified,
              };

              // TODO: find-or-create user in your DB using payload.sub (recommended unique id)
              // Then create your own session/JWT.

              // Example: set a cookie session token (replace with real session/JWT)
              // res.cookie("session", yourAppJwt, {
              //   httpOnly: true,
              //   secure: process.env.NODE_ENV === "production",
              //   sameSite: "lax",
              // });

              return res.json({ ok: true, user });
            } catch (err) {
              console.error(err);
              return res.status(401).json({ error: "Token verification failed" });
            }
      });




Security Model

No tokens are stored in localStorage or sessionStorage

Google ID token is sent directly to your backend

You fully control:

Verification

Sessions

Cookies

User lifecycle

This aligns with OAuth best practices and modern security requirements.

Performance Notes

Loads Google script only once

No re-renders

No layout shifts

No UI blocking

Zero runtime dependencies

Framework Notes
Next.js

Use inside a client component:

"use client";

React Strict Mode

Safe to use — initialization is guarded internally.

SEO Keywords

google one tap
react google one tap
google sign in react
google oauth react
react authentication
oauth login react
google identity services
react auth component

Sponsor

This project is sponsored and maintained by Stockbase.

🔗 https://stockbase.pro

Stockbase is building next-generation financial and AI-driven platforms focused on speed, security, and user experience.

License

MIT



---

### Why this helps SEO & credibility

- npm search indexes README text
- Keywords section improves discovery
- “Why This Package” speaks to CTOs & founders
- Sponsor section builds trust + brand recall

If you want next:
- npm **badge section**
- GitHub **Open Graph preview**
- short **landing page copy**
- or auto-generated **TypeScript types**

Just tell me 🚀


---

## CORS (Common Issue & How to Fix It)

Google One Tap itself **does not cause CORS issues**.  
CORS problems usually occur when your **frontend sends the Google ID token to your backend** (`authUrl`).

### Typical CORS Error

```text
Access to fetch at 'https://api.yourdomain.com/api/auth/google'
from origin 'https://yourfrontend.com'
has been blocked by CORS policy
This means your backend is not allowing requests from your frontend origin.

Recommended Backend CORS Setup (Node.js / Express)
Basic Example (most common)

import cors from "cors";

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://yourfrontend.com"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));
⚠️ Important
If you use credentials: true, you CANNOT use origin: "*".
Browsers will block it.

If You Need to Allow Multiple Environments

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://yourfrontend.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));


### Why this section is valuable
- Solves the **#1 real issue devs hit**
- Improves npm search relevance (CORS + Google auth)
- Reduces GitHub issues/questions
- Signals **senior-level engineering maturity**

If you want next, I can:
- add **Vercel / Netlify specific CORS notes**
- add **Cloudflare / Nginx CORS config**
- add **Next.js API route example**
- add **production hardening tips**

Just say the word 🚀


