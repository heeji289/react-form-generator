import React from 'react';

interface QueryParams<T> {
  queryFn: () => Promise<T>;
}

/**
 * NOTE: Tanstack Query like hook 만들기
 * - Suspense 처리 가능하도록
 */
export function useQuery<T>({ queryFn }: QueryParams<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    queryFn()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}
