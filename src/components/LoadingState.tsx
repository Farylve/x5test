export default function LoadingState({ message }: { message: string }) {
  return (
    <div className="loading-body">
      <progress />
      <p>{message}</p>
    </div>
  );
}
