import { get } from '@vercel/edge-config';

const EXCLUDED_PATH_PREFIXES = ['/api', '/_next', '/static', '/assets'];
const EXCLUDED_PATHS = ['/maintenance.html', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

function isExcludedPath(pathname) {
  if (EXCLUDED_PATHS.includes(pathname)) return true;
  if (EXCLUDED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export const config = {
  matcher: '/:path*'
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (isExcludedPath(pathname)) {
    return;
  }

  const accept = request.headers.get('accept') || '';
  const isPageRequest = accept.includes('text/html');
  if (!isPageRequest) {
    return;
  }

  let isInMaintenanceMode = false;
  try {
    isInMaintenanceMode = Boolean(await get('isInMaintenanceMode'));
  } catch {
    // Fail open: if Edge Config is unreachable, keep the site available.
    return;
  }

  if (isInMaintenanceMode) {
    const maintenanceUrl = new URL('/maintenance.html', request.url);
    return fetch(maintenanceUrl);
  }

  return;
}
