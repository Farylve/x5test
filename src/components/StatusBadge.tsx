import { statusClass } from "../utils";

export default function StatusBadge({ status }: { status: string }) {
  return <span className={statusClass(status)}>{status}</span>;
}
