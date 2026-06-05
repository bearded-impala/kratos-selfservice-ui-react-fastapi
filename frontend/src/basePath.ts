// Mount prefix injected by the backend into index.html at startup.

function readBasePath(): string {
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="kratos-ui-base"]',
  );
  return (meta?.content ?? "").replace(/\/$/, "");
}

export const basePath = readBasePath();

export function withBase(path: string): string {
  return `${basePath}${path}`;
}
