import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeAll, afterAll, afterEach, describe, it, expect } from "vitest";
import { server } from "./msw-server";
import { resetMockData } from "../mocks/handlers";
import IncidentList from "../pages/IncidentList";

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  server.resetHandlers();
  resetMockData();
});
afterAll(() => server.close());

function renderWithProviders(ui: React.ReactElement, route = "/incidents") {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe("IncidentList", () => {
  it("renders the list of incidents with pagination", async () => {
    renderWithProviders(<IncidentList />);

    await waitFor(() => {
      expect(screen.getByText("INC-001")).toBeInTheDocument();
    });

    expect(screen.getByText(/Всего: 20/)).toBeInTheDocument();
    expect(screen.getByText("Вперёд »")).toBeInTheDocument();
  });

  it("filters incidents by status", async () => {
    const user = userEvent.setup();
    renderWithProviders(<IncidentList />);

    await waitFor(() => {
      expect(screen.getByText("INC-001")).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText("Статус:"), "Решён");

    await waitFor(() => {
      expect(screen.getByText(/Всего: 5/)).toBeInTheDocument();
    });
  });

  it("searches incidents by title", async () => {
    const user = userEvent.setup();
    renderWithProviders(<IncidentList />);

    await waitFor(() => {
      expect(screen.getByText("INC-001")).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText("Поиск:"), "пробка");

    await waitFor(() => {
      expect(screen.getByText("INC-002")).toBeInTheDocument();
      expect(screen.getByText(/Всего: 1/)).toBeInTheDocument();
    });
  });

  it("shows empty state when no results match filters", async () => {
    const user = userEvent.setup();
    renderWithProviders(<IncidentList />);

    await waitFor(() => {
      expect(screen.getByText("INC-001")).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText("Поиск:"), "несуществующий_запрос");

    await waitFor(() => {
      expect(
        screen.getByText("Нет инцидентов по выбранным фильтрам.")
      ).toBeInTheDocument();
    });
  });
});
