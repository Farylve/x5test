export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ru-RU");
}

const STATUS_CLASS_MAP: Record<string, string> = {
  "Новый": "badge-new",
  "В работе": "badge-in-progress",
  "Решён": "badge-resolved",
};

const PRIORITY_CLASS_MAP: Record<string, string> = {
  "Низкий": "badge-low",
  "Средний": "badge-medium",
  "Высокий": "badge-high",
};

export function statusClass(status: string): string {
  return "badge " + (STATUS_CLASS_MAP[status] ?? "");
}

export function priorityClass(priority: string): string {
  return "badge " + (PRIORITY_CLASS_MAP[priority] ?? "");
}
