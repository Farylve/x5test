import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  statusBar?: ReactNode;
}

export default function XpWindow({ title, children, statusBar }: Props) {
  return (
    <div className="window app-window">
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">{children}</div>
      {statusBar}
    </div>
  );
}
