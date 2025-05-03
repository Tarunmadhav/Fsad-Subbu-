import { useState, useCallback } from 'react';
import { errorMessages } from '../config';

interface ErrorState {
  message: string;
  code?: string;
}

export const useError = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((error: any) => {
    if (error.response) {
      // Handle API errors
      const status = error.response.status;
      switch (status) {
        case 401:
          setError({ message: errorMessages.UNAUTHORIZED, code: '401' });
          break;
        case 403:
          setError({ message: errorMessages.FORBIDDEN, code: '403' });
          break;
        default:
          setError({
            message: error.response.data?.message || 'An error occurred',
            code: status.toString()
          });
      }
    } else if (error.request) {
      // Network error
      setError({ message: errorMessages.NETWORK_ERROR, code: 'NETWORK_ERROR' });
    } else {
      // Other errors
      setError({ message: error.message || 'An error occurred' });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};
