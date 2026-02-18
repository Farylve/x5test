import { http, HttpResponse, delay } from "msw";
import { incidents as initialIncidents, notes as initialNotes } from "../data";
import type { Incident, Note, IncidentStatus, IncidentPriority } from "../types";

let incidents: Incident[] = [...initialIncidents];
let notes: Note[] = [...initialNotes];
let noteCounter = notes.length + 1;

export const handlers = [
  http.get("/api/incidents", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const status = url.searchParams.get("status") ?? "";
    const priority = url.searchParams.get("priority") ?? "";
    const sort = url.searchParams.get("sort") ?? "newest";
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(url.searchParams.get("limit")) || 5);

    let filtered = [...incidents];

    if (search) {
      filtered = filtered.filter(
        (i) =>
          i.title.toLowerCase().includes(search) ||
          i.id.toLowerCase().includes(search)
      );
    }
    if (status) {
      filtered = filtered.filter((i) => i.status === status);
    }
    if (priority) {
      filtered = filtered.filter((i) => i.priority === priority);
    }

    filtered.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sort === "oldest" ? da - db : db - da;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return HttpResponse.json({ data, total, page, limit, totalPages });
  }),

  http.get("/api/incidents/:id", async ({ params }) => {
    await delay(200);
    const incident = incidents.find((i) => i.id === params.id);
    if (!incident) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(incident);
  }),

  http.patch("/api/incidents/:id", async ({ params, request }) => {
    await delay(200);
    const body = (await request.json()) as Partial<{
      status: IncidentStatus;
      priority: IncidentPriority;
    }>;
    const idx = incidents.findIndex((i) => i.id === params.id);
    if (idx === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    incidents[idx] = { ...incidents[idx], ...body };
    return HttpResponse.json(incidents[idx]);
  }),

  http.get("/api/incidents/:id/notes", async ({ params }) => {
    await delay(200);
    const result = notes.filter((n) => n.incidentId === params.id);
    return HttpResponse.json(result);
  }),

  http.post("/api/incidents/:id/notes", async ({ params, request }) => {
    await delay(200);
    const body = (await request.json()) as { text: string };
    const note: Note = {
      id: `N-${String(++noteCounter).padStart(3, "0")}`,
      incidentId: params.id as string,
      text: body.text,
      author: "Оператор",
      createdAt: new Date().toISOString(),
    };
    notes.push(note);
    return HttpResponse.json(note, { status: 201 });
  }),
];

export function resetMockData() {
  incidents = [...initialIncidents];
  notes = [...initialNotes];
  noteCounter = initialNotes.length + 1;
}
