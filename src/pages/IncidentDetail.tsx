import { useParams, useNavigate } from "react-router-dom";
import { useIncident, useNotes, useUpdateIncident, useAddNote } from "../hooks/useIncident";
import { STATUSES, PRIORITIES } from "../constants";
import { formatDate } from "../utils";
import type { IncidentStatus, IncidentPriority } from "../types";
import XpWindow from "../components/XpWindow";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import NotesList from "../components/NotesList";
import NoteForm from "../components/NoteForm";

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: incident, isLoading, isError, error } = useIncident(id!);
  const { data: notes } = useNotes(id!);
  const updateIncident = useUpdateIncident(id!);
  const addNote = useAddNote(id!);

  if (isLoading) {
    return (
      <XpWindow title="Загрузка...">
        <LoadingState message="Загрузка деталей инцидента..." />
      </XpWindow>
    );
  }

  if (isError) {
    const is404 = (error as Error)?.message === "Not found";
    return (
      <XpWindow title={is404 ? "Не найдено" : "Ошибка"}>
        <ErrorState
          icon={is404 ? "\uD83D\uDD0D" : "\u274C"}
          message={
            is404
              ? `Инцидент «${id}» не найден.`
              : "Не удалось загрузить данные инцидента."
          }
          action={{ label: "← Назад к списку", onClick: () => navigate("/incidents") }}
        />
      </XpWindow>
    );
  }

  if (!incident) return null;

  return (
    <XpWindow
      title={`${incident.id} — ${incident.title}`}
      statusBar={
        <div className="status-bar">
          <p className="status-bar-field">Статус: {incident.status}</p>
          <p className="status-bar-field">Приоритет: {incident.priority}</p>
        </div>
      }
    >
      <button className="back-btn" onClick={() => navigate("/incidents")}>
        ← Назад к списку
      </button>

      <fieldset>
        <legend>Детали инцидента</legend>
        <dl className="detail-grid">
          <dt>ID:</dt>
          <dd>{incident.id}</dd>
          <dt>Название:</dt>
          <dd>{incident.title}</dd>
          <dt>Описание:</dt>
          <dd>{incident.description}</dd>
          <dt>Репортер:</dt>
          <dd>{incident.reporter}</dd>
          <dt>Дата создания:</dt>
          <dd>{formatDate(incident.createdAt)}</dd>
        </dl>
      </fieldset>

      <fieldset>
        <legend>Действия</legend>
        <div className="actions-row">
          <div className="field-row">
            <label htmlFor="status-select">Статус:</label>
            <select
              id="status-select"
              value={incident.status}
              onChange={(e) =>
                updateIncident.mutate({ status: e.target.value as IncidentStatus })
              }
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field-row">
            <label htmlFor="priority-select">Приоритет:</label>
            <select
              id="priority-select"
              value={incident.priority}
              onChange={(e) =>
                updateIncident.mutate({ priority: e.target.value as IncidentPriority })
              }
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Заметки / Хронология</legend>
        <NotesList notes={notes ?? []} />
        <NoteForm
          onSubmit={(text) => addNote.mutate(text)}
          disabled={addNote.isPending}
        />
      </fieldset>
    </XpWindow>
  );
}
