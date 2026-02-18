import type {
  Incident,
  Note,
  IncidentStatus,
  IncidentPriority,
  PaginatedResponse,
} from "./types";

export interface FetchIncidentsParams {
  search?: string;
  status?: string;
  priority?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function fetchIncidents(
  params: FetchIncidentsParams
): Promise<PaginatedResponse<Incident>> {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  if (params.priority) qs.set("priority", params.priority);
  if (params.sort) qs.set("sort", params.sort);
  qs.set("page", String(params.page ?? 1));
  qs.set("limit", String(params.limit ?? 5));
  const res = await fetch(`/api/incidents?${qs}`);
  if (!res.ok) throw new Error("Ошибка загрузки инцидентов");
  return res.json();
}

export async function fetchIncident(id: string): Promise<Incident> {
  const res = await fetch(`/api/incidents/${id}`);
  if (res.status === 404) throw new Error("Not found");
  if (!res.ok) throw new Error("Ошибка загрузки инцидента");
  return res.json();
}

export async function patchIncident(
  id: string,
  body: Partial<{ status: IncidentStatus; priority: IncidentPriority }>
): Promise<Incident> {
  const res = await fetch(`/api/incidents/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Ошибка обновления инцидента");
  return res.json();
}

export async function fetchNotes(incidentId: string): Promise<Note[]> {
  const res = await fetch(`/api/incidents/${incidentId}/notes`);
  if (!res.ok) throw new Error("Ошибка загрузки заметок");
  return res.json();
}

export async function createNote(
  incidentId: string,
  text: string
): Promise<Note> {
  const res = await fetch(`/api/incidents/${incidentId}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Ошибка добавления заметки");
  return res.json();
}
