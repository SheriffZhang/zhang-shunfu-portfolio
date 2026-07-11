import { cp } from "node:fs/promises";

// Vercel serves the client bundle as static files while api/index.mjs renders
// Vinext's server bundle for document and project-detail requests.
await cp("dist/client", "public", { recursive: true, force: true });
