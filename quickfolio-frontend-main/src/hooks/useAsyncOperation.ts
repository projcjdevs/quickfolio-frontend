// src/hooks/useAsyncOperation.ts
import { useState, useCallback } from 'react';

interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface AsyncOperationResult<T> {
  state: AsyncOperationState<T>;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

/**
 * Custom hook for handling async operations with loading, error, and data states
 * @param asyncFunction - The async function to execute
 * @returns Object containing state and control functions
 */
export function useAsyncOperation<T>(
  asyncFunction: (...args: any[]) => Promise<T>
): AsyncOperationResult<T> {
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const result = await asyncFunction(...args);
        setState(prev => ({ ...prev, data: result, loading: false }));
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        throw error;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return { state, execute, reset };
}

/**
 * Custom hook for handling multiple async operations
 * @param operations - Object containing named async operations
 * @returns Object with states and execute functions for each operation
 */
export function useMultipleAsyncOperations<T extends Record<string, (...args: any[]) => Promise<any>>>(
  operations: T
): {
  [K in keyof T]: {
    state: AsyncOperationState<Awaited<ReturnType<T[K]>>>;
    execute: T[K];
    reset: () => void;
  };
} {
  const result = {} as any;

  for (const [key, operation] of Object.entries(operations)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { state, execute, reset } = useAsyncOperation(operation);
    result[key] = { state, execute, reset };
  }

  return result;
}
