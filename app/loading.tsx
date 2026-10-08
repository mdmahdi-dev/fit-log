export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-800 border-t-lime-400" />

        <p className="mt-6 text-sm font-bold tracking-[0.3em] text-lime-400">
          FITLOG
        </p>

        <p className="mt-2 text-zinc-500">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}