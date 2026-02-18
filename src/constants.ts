import type { IncidentStatus, IncidentPriority } from "./types";

export const STATUSES: IncidentStatus[] = ["Новый", "В работе", "Решён"];
export const PRIORITIES: IncidentPriority[] = ["Низкий", "Средний", "Высокий"];

export const STATUS_ALL = ["", ...STATUSES] as const;
export const PRIORITY_ALL = ["", ...PRIORITIES] as const;
