import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIncidents } from "../hooks/useIncidents";
import XpWindow from "../components/XpWindow";
import IncidentToolbar from "../components/IncidentToolbar";
import IncidentTable from "../components/IncidentTable";
import Pagination from "../components/Pagination";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

const PAGE_SIZE = 5;

export default function IncidentList() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get("search") ?? "");
  const status = params.get("status") ?? "";
  const priority = params.get("priority") ?? "";
  const sort = params.get("sort") ?? "newest";
  const page = Math.max(1, Number(params.get("page")) || 1);

  function updateParam(key: string, value: string) {
    setParams((prev) => {
      if (value) prev.set(key, value);
      else prev.delete(key);
      return prev;
    });
  }

  function setPage(p: number) {
    updateParam("page", p > 1 ? String(p) : "");
  }

  function handleFilterChange(key: string, value: string) {
    setParams((prev) => {
      if (value) prev.set(key, value);
      else prev.delete(key);
      prev.delete("page");
      return prev;
    });
  }

  const { data: response, isLoading, isError } = useIncidents({
    search,
    status,
    priority,
    sort,
    page,
    limit: PAGE_SIZE,
  });

  function renderDataArea() {
    if (isLoading) return <LoadingState message="Загрузка инцидентов..." />;

    if (isError) {
      return (
        <ErrorState
          message="Не удалось загрузить инциденты. Попробуйте ещё раз."
          action={{ label: "Повторить", onClick: () => window.location.reload() }}
        />
      );
    }

    if (response && response.data.length === 0) {
      return (
        <div className="empty-state">
          <p>Нет инцидентов по выбранным фильтрам.</p>
        </div>
      );
    }

    return (
      <IncidentTable
        incidents={response?.data ?? []}
        onSelect={(id) => navigate(`/incidents/${id}`)}
      />
    );
  }

  return (
    <XpWindow
      title="Входящие инциденты"
      statusBar={
        <div className="status-bar">
          <p className="status-bar-field">
            Всего: {response?.total ?? 0}
          </p>
          <p className="status-bar-field">
            Стр. {response?.page ?? 1} из {response?.totalPages ?? 1}
          </p>
          <p className="status-bar-field">
            {status ? `Статус: ${status}` : "Все статусы"}
          </p>
          <p className="status-bar-field">
            {priority ? `Приоритет: ${priority}` : "Все приоритеты"}
          </p>
        </div>
      }
    >
      <IncidentToolbar
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          handleFilterChange("search", v);
        }}
        status={status}
        onStatusChange={(v) => handleFilterChange("status", v)}
        priority={priority}
        onPriorityChange={(v) => handleFilterChange("priority", v)}
        sort={sort}
        onSortChange={(v) => handleFilterChange("sort", v)}
      />
      <div className="sunken-panel data-area">{renderDataArea()}</div>
      {response && response.totalPages > 1 && (
        <Pagination
          page={response.page}
          totalPages={response.totalPages}
          onPageChange={setPage}
        />
      )}
    </XpWindow>
  );
}
