import { useState } from "react";

interface Props {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export default function NoteForm({ onSubmit, disabled }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setText("");
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="field-row-stacked" style={{ flex: 1 }}>
        <label htmlFor="note-input">Добавить заметку:</label>
        <textarea
          id="note-input"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст заметки..."
        />
      </div>
      <button type="submit" disabled={disabled || !text.trim()}>
        Добавить
      </button>
    </form>
  );
}
