export default function LoadingSpinner({ loading }) {
  return (
    loading && (
      <div className="fixed inset-0 bg-white/90 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-black" />
      </div>
    )
  );
}