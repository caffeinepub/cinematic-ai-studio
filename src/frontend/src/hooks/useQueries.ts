import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { VideoProject } from '../backend';

export function useProjects() {
  const { actor, isFetching } = useActor();

  return useQuery<VideoProject[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProject(projectId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<VideoProject>({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProject(projectId);
    },
    enabled: !!actor && !isFetching && !!projectId,
  });
}

export function useProjectStatus(projectId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<VideoProject>({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProject(projectId);
    },
    enabled: !!actor && !isFetching && !!projectId,
    refetchInterval: (query) => {
      const project = query.state.data;
      return project?.status === 'generating' ? 5000 : false;
    },
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      concept: string;
      length: bigint;
      stylePreferences: string;
      targetAudience: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createVideoProject(
        data.title,
        data.concept,
        data.length,
        data.stylePreferences,
        data.targetAudience
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProjectStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { projectId: string; status: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProjectStatus(data.projectId, data.status);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
