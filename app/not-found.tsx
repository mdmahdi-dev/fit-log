import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
          FITLOG
        </p>

        <h1 className="mt-4 text-7xl font-black">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold uppercase">
          Workout Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-zinc-400">
          The page you're looking for doesn't exist or the
          workout could not be found.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}