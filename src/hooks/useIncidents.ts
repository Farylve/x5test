import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchIncidents } from "../api";

export function useIncidents(params: {
  search: string;
  status: string;
  priority: string;
  sort: string;
  page: number;
  limit: number;
}) {
  return useQuery({
    queryKey: [
      "incidents",
      params.search,
      params.status,
      params.priority,
      params.sort,
      params.page,
      params.limit,
    ],
    queryFn: () => fetchIncidents(params),
    placeholderData: keepPreviousData,
  });
}
