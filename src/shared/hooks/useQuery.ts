import React from 'react';

interface QueryParams<T> {
  queryFn: () => Promise<T>;
  onSuccess?: (data: T) => void;
}

/**
 * NOTE: Tanstack Query like hook 만들기
 * - Suspense 처리 가능하도록
 */
export function useQuery<T>({ queryFn, onSuccess }: QueryParams<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    queryFn()
      .then((data) => {
        setData(data);
        onSuccess?.(data);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}
