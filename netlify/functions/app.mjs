import worker from "../../dist/server/index.js";

export default async function handler(request) {
  return worker.fetch(
    request,
    { ASSETS: { fetch: (assetRequest) => fetch(assetRequest) } },
    { waitUntil() {} },
  );
}
