import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useDelayedQuery = <T>({
  cacheKey,
  requestHandler,
  isActive = true,
  minimumDelay = 3000,
  cacheDuration = 1000 * 60,
}: {
  cacheKey: string[];
  requestHandler: () => Promise<T>;
  isActive?: boolean;
  minimumDelay?: number;
  cacheDuration?: number;
}): UseQueryResult<T, unknown> => {

  const queryResponse = useQuery<T>({
    queryKey: cacheKey,
    queryFn: async () => {
      const startTime = Date.now();
      const response = await requestHandler();
      const executionTime = Date.now() - startTime;

      if (executionTime < minimumDelay) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumDelay - executionTime)
        );
      }

      return response;
    },
    enabled: isActive,
    staleTime: cacheDuration,
  });

  return queryResponse;
};