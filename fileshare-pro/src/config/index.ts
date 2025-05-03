export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  MAX_FILE_SIZE: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '104857600', 10),
  SUPPORTED_FILE_TYPES: (import.meta.env.VITE_SUPPORTED_FILE_TYPES || 'image/*,.pdf,.doc,.docx,.txt').split(','),
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || 'fileshare_token',
} as const;

export const errorMessages = {
  FILE_TOO_LARGE: 'File size exceeds the maximum limit',
  UNSUPPORTED_FILE_TYPE: 'File type is not supported',
  UNAUTHORIZED: 'Please log in to continue',
  FORBIDDEN: 'You do not have permission to perform this action',
  NETWORK_ERROR: 'Network error occurred. Please try again',
} as const;
