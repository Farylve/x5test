import { STATUS_ALL, PRIORITY_ALL } from "../constants";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  priority: string;
  onPriorityChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

export default function IncidentToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className="toolbar">
      <div className="field-row">
        <label htmlFor="search">Поиск:</label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ID или название..."
        />
      </div>
      <div className="field-row">
        <label htmlFor="status-filter">Статус:</label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {STATUS_ALL.map((s) => (
            <option key={s} value={s}>
              {s || "Все"}
            </option>
          ))}
        </select>
      </div>
      <div className="field-row">
        <label htmlFor="priority-filter">Приоритет:</label>
        <select
          id="priority-filter"
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          {PRIORITY_ALL.map((p) => (
            <option key={p} value={p}>
              {p || "Все"}
            </option>
          ))}
        </select>
      </div>
      <div className="field-row">
        <label htmlFor="sort">Сортировка:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
        </select>
      </div>
    </div>
  );
}
