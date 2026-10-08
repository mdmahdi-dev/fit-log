"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useFitLog } from "@/components/FitLogProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const [menuOpen, setMenuOpen] = useState(false);

  const workoutActive = pathname === "/";
  const planActive = pathname === "/my-plan";

  return (
    <nav className="border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main navbar */}
        <div className="flex items-center justify-between gap-4 py-5">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="FitLog"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 sm:flex">
            <Link
              href="/"
              className={`font-medium transition ${
                workoutActive
                  ? "text-lime-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className={`font-medium transition ${
                planActive
                  ? "text-lime-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

          {/* Counters + mobile menu button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/my-plan"
              className="rounded-full bg-lime-400 px-3 py-2 text-xs font-bold text-black transition hover:bg-lime-300 sm:px-4 sm:text-sm"
            >
              Plan {plan.length}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-zinc-600 px-3 py-2 text-xs font-bold text-white transition hover:border-lime-400 hover:text-lime-400 sm:px-4 sm:text-sm"
            >
              Saved {saved.length}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg border border-zinc-700 p-2 sm:hidden"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-zinc-800 py-4 sm:hidden">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 font-medium transition ${
                  workoutActive
                    ? "bg-zinc-900 text-lime-400"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                Workout
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 font-medium transition ${
                  planActive
                    ? "bg-zinc-900 text-lime-400"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                My Plan
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}