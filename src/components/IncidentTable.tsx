import type { Incident } from "../types";
import { formatDate } from "../utils";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

interface Props {
  incidents: Incident[];
  onSelect: (id: string) => void;
}

export default function IncidentTable({ incidents, onSelect }: Props) {
  return (
    <table className="incidents-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Статус</th>
          <th>Приоритет</th>
          <th>Дата</th>
          <th>Репортер</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map((inc) => (
          <tr
            key={inc.id}
            onClick={() => onSelect(inc.id)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect(inc.id);
            }}
          >
            <td>{inc.id}</td>
            <td>{inc.title}</td>
            <td>
              <StatusBadge status={inc.status} />
            </td>
            <td>
              <PriorityBadge priority={inc.priority} />
            </td>
            <td>{formatDate(inc.createdAt)}</td>
            <td>{inc.reporter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
