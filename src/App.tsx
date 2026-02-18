import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IncidentList from "./pages/IncidentList";
import IncidentDetail from "./pages/IncidentDetail";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/incidents" replace />} />
          <Route path="/incidents" element={<IncidentList />} />
          <Route path="/incidents/:id" element={<IncidentDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
