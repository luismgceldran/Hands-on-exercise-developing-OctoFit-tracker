export function buildApiUrl(path) {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const apiPath = normalizedPath.startsWith('/api') ? normalizedPath : `/api${normalizedPath}`;

  if (codeSpaceName) {
    return `https://${codeSpaceName}-8000.app.github.dev${apiPath}`;
  }

  return `http://localhost:8000${apiPath}`;
}
