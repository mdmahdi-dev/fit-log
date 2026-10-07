import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight">
          FITLOG
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-medium text-lime-400"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="font-medium text-zinc-400 transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-black"
          >
            Plan 0
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-600 px-4 py-2 text-sm font-bold text-white"
          >
            Saved 0
          </Link>
        </div>

      </div>
    </nav>
  );
}