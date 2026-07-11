import worker from "../dist/server/index.js";

function toHeaders(source) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value)) headers.set(key, value.join(", "));
    else if (value !== undefined) headers.set(key, value);
  }
  return headers;
}

export default async function handler(req, res) {
  const host = req.headers.host ?? "localhost";
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const request = new Request(`${protocol}://${host}${req.url}`, {
    method: req.method,
    headers: toHeaders(req.headers),
  });

  const response = await worker.fetch(
    request,
    { ASSETS: { fetch: (assetRequest) => fetch(assetRequest) } },
    { waitUntil() {} },
  );

  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}
