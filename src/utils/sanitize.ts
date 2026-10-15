/**
 * Input Sanitization Utility
 * Fix Issue #4: Prevent XSS attacks
 */

/**
 * Sanitize string input to prevent XSS
 * Removes dangerous characters: < > " ' &
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/&/g, '&amp;');
};

/**
 * Sanitize email input
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return '';
  return email.toLowerCase().trim();
};

/**
 * Sanitize phone number (allow only digits, +, -, space)
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/[^0-9+\-\s]/g, '');
};

/**
 * Sanitize numeric input
 */
export const sanitizeNumber = (value: string): number => {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone format (Indonesian format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Validate NPWP format
 */
export const isValidNPWP = (npwp: string): boolean => {
  const npwpRegex = /^\d{2}\.\d{3}\.\d{3}\.\d{1}-\d{3}\.\d{3}$/;
  return npwpRegex.test(npwp);
};
