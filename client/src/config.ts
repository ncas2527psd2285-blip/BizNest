const API_BASE_URL =
  (
    import.meta.env.VITE_API_URL as
      | string
      | undefined
  )?.trim() ||
  "http://localhost:5000/api";

/**
 * Authenticated BizNest API
 *
 * Example:
 * http://localhost:5000/api
 */
export const API_ROOT =
  API_BASE_URL;

/**
 * Website management API
 *
 * Example:
 * http://localhost:5000/api/websites
 */
export const API_URL =
  `${API_BASE_URL}/websites`;

/**
 * Public website API
 *
 * Example:
 * http://localhost:5000/sites
 */
export const PUBLIC_API_URL =
  API_BASE_URL.replace(
    /\/api\/?$/,
    ""
  );