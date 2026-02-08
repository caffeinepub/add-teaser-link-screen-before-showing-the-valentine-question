import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useGetMessage() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  return useQuery({
    queryKey: ['message', principal?.toString()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getMessage(principal);
    },
    enabled: !!actor && !isFetching && !!principal,
  });
}

export function useGetMessageCount() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['messageCount'],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getMessageCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addMessage(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message', identity?.getPrincipal().toString()] });
      queryClient.invalidateQueries({ queryKey: ['messageCount'] });
    },
  });
}
