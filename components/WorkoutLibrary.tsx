"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

interface WorkoutLibraryProps {
  workouts: Workout[];
}

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary({
  workouts,
}: WorkoutLibraryProps) {
  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
            THE LIBRARY
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase">
            The Library
          </h2>

          <p className="mt-3 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-500">
            Sort By
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as SortOption
                )
              }
              className="appearance-none rounded-full border border-zinc-700 bg-zinc-950 py-2 pl-4 pr-10 text-sm font-bold text-white outline-none transition focus:border-lime-400"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* Workout Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </section>
  );
}