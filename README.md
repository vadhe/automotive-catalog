# FakeStore Catalog

Hey there! This is a simple but solid e-commerce catalog project built with Next.js using the FakeStore API. It includes responsive product listings, dynamic filtering, a custom product detail page, and a locally persistent Wishlist feature.

## Tech Stack
Here's what I used to build this out:
- **Next.js 15 (App Router)** - For the main framework, routing, and SSR architecture.
- **React 19** - Building the UI components.
- **TypeScript** - For writing safe, strongly-typed code.
- **Tailwind CSS** - For responsive, utility-first styling.
- **Redux Toolkit & Redux Persist** - For managing the global wishlist state and saving it in local storage.
- **TanStack React Query** - For fetching, caching, and syncing the FakeStore API data.
- **Biome** - For super fast linting and formatting.

## Running the App Locally

To get this running on your local machine, follow these easy steps:

1. **Prerequisites:** Make sure you have Node.js and `pnpm` installed.
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Start the dev server:**
   ```bash
   pnpm run dev
   ```
4. **Open it up:** Check it out at [http://localhost:3000](http://localhost:3000) in your browser.

## Dealing with React Hydration Mismatches

When you use local storage (via `redux-persist`) in a Next.js App Router app, you almost always run into a nasty React hydration mismatch error. This happens because the Server-Side Render (SSR) pass doesn't have access to the browser's `localStorage`. Because of that, the server spits out the default state (like `0` items in the wishlist or cart). Then, a hot second later, the client-side JavaScript boots up, reads the `localStorage` (say, `3` items), and tries to render it. React freaks out because the initial server HTML doesn't match the client HTML.

*(Note: We built a persistent Wishlist feature for this project rather than a full checkout Cart to keep the scope clean, but the hydration problem and solution are the exact same!)*

Here is how I handled it:
1. **PersistGate**: I used `PersistGate` inside the global `StoreProvider` (which stays a Client Component) to make sure the Redux state holds off on full hydration until the local data is successfully pulled from the browser.
2. **The useEffect trick**: Even with `PersistGate`, components that are rendered early by the server (like the `Navbar` counter badge) can still mismatch if they try to pull the `localstorage` value directly on their first render pass. So, in `Navbar.tsx`, I set the badge count to a hard `0` by default using `useState`. Then, I use a simple `useEffect` to grab the actual Redux Persist value and update the count *after* the component has safely mounted on the client. 

This strategy guarantees the server and client initial renders match up perfectly under the hood, and the UI just gracefully snaps into place a split-second later without any noisy console errors!
