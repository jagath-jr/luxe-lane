const defaultAdminKey = "admin123";

export function getAdminKey() {
  return process.env.ADMIN_PORTAL_KEY || defaultAdminKey;
}

export function isAdminAuthorized(request) {
  const bearer = request.headers.get("authorization") || "";
  const headerKey = request.headers.get("x-admin-key");
  const token = bearer.startsWith("Bearer ") ? bearer.slice(7) : headerKey;

  return token === getAdminKey();
}
