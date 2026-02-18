interface Props {
  message: string;
  icon?: string;
  action?: { label: string; onClick: () => void };
}

export default function ErrorState({
  message,
  icon = "\u274C",
  action,
}: Props) {
  return (
    <div className="error-body">
      <span className="error-icon">{icon}</span>
      <div>
        <p>{message}</p>
        {action && <button onClick={action.onClick}>{action.label}</button>}
      </div>
    </div>
  );
}
