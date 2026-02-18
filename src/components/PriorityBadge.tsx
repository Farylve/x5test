import { priorityClass } from "../utils";

export default function PriorityBadge({ priority }: { priority: string }) {
  return <span className={priorityClass(priority)}>{priority}</span>;
}
