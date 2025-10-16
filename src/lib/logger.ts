/**
 * Secure logging utility that only logs sensitive data in development mode
 * In production, sensitive logs are suppressed to prevent information disclosure
 */

const isDevelopment = import.meta.env.DEV;

export const secureLog = {
  /**
   * Log informational messages (only in development)
   */
  info: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },

  /**
   * Log error messages (only in development for sensitive errors)
   */
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error);
    }
    // In production, you could send to error tracking service like Sentry
  },

  /**
   * Log warning messages (only in development)
   */
  warn: (message: string, data?: any) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  },

  /**
   * Always log - use for non-sensitive information only
   */
  public: (message: string, data?: any) => {
    console.log(message, data);
  }
};
