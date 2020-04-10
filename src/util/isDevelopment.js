/**
 * Check if the application is running in development mode.
 *
 * @returns {boolean} Whether the application is running in develooment mode.
 */
export default function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}
