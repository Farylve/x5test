import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchIncident, patchIncident, fetchNotes, createNote } from "../api";
import type { Incident } from "../types";

export function useIncident(id: string) {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: () => fetchIncident(id),
  });
}

export function useNotes(incidentId: string) {
  return useQuery({
    queryKey: ["notes", incidentId],
    queryFn: () => fetchNotes(incidentId),
  });
}

export function useUpdateIncident(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<Incident>) => patchIncident(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incident", id] });
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });
}

export function useAddNote(incidentId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (text: string) => createNote(incidentId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", incidentId] });
    },
  });
}
