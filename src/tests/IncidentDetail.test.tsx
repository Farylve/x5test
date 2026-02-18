import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeAll, afterAll, afterEach, describe, it, expect } from "vitest";
import { server } from "./msw-server";
import { resetMockData } from "../mocks/handlers";
import IncidentDetail from "../pages/IncidentDetail";

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  server.resetHandlers();
  resetMockData();
});
afterAll(() => server.close());

function renderDetail(id: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/incidents/${id}`]}>
        <Routes>
          <Route path="/incidents/:id" element={<IncidentDetail />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("IncidentDetail", () => {
  it("renders incident details", async () => {
    renderDetail("INC-001");

    await waitFor(() => {
      expect(screen.getByText("Повреждённая посылка на маршруте 12")).toBeInTheDocument();
    });

    expect(screen.getByText("Алексей Петров")).toBeInTheDocument();
    expect(screen.getByText("Статус: Новый")).toBeInTheDocument();
  });

  it("changes status via dropdown", async () => {
    const user = userEvent.setup();
    renderDetail("INC-001");

    await waitFor(() => {
      expect(screen.getByLabelText("Статус:")).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText("Статус:"), "В работе");

    await waitFor(() => {
      expect(screen.getByText("Статус: В работе")).toBeInTheDocument();
    });
  });

  it("adds a note", async () => {
    const user = userEvent.setup();
    renderDetail("INC-001");

    await waitFor(() => {
      expect(screen.getByLabelText("Добавить заметку:")).toBeInTheDocument();
    });

    await user.type(
      screen.getByLabelText("Добавить заметку:"),
      "Тестовая заметка"
    );
    await user.click(screen.getByRole("button", { name: "Добавить" }));

    await waitFor(() => {
      expect(screen.getByText("Тестовая заметка")).toBeInTheDocument();
    });
  });

  it("shows not found for invalid ID", async () => {
    renderDetail("INC-999");

    await waitFor(() => {
      expect(
        screen.getByText(/Инцидент «INC-999» не найден/)
      ).toBeInTheDocument();
    });
  });
});
