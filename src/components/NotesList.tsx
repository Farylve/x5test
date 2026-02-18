import type { Note } from "../types";
import { formatDate } from "../utils";

export default function NotesList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return <p style={{ color: "#666", fontSize: 12 }}>Заметок пока нет.</p>;
  }

  return (
    <ul className="notes-list">
      {notes.map((n) => (
        <li key={n.id}>
          <div>{n.text}</div>
          <div className="note-meta">
            {n.author} — {formatDate(n.createdAt)}
          </div>
        </li>
      ))}
    </ul>
  );
}
