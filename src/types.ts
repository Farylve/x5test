export type IncidentStatus = "Новый" | "В работе" | "Решён";
export type IncidentPriority = "Низкий" | "Средний" | "Высокий";

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  reporter: string;
  createdAt: string;
}

export interface Note {
  id: string;
  incidentId: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
