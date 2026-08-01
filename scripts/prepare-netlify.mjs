import { cp } from "node:fs/promises";

// Netlify serves the Vinext client bundle as static assets. Dynamic document
// requests are handled by netlify/functions/app.mjs.
await cp("dist/client", "public", { recursive: true, force: true });
