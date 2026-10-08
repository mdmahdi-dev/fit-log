import { Clock, Flame, Star } from "lucide-react";
import Link from "next/link";

import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-lime-400"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Muscle group tags */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="mt-4 text-lg font-bold leading-tight sm:text-xl">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-zinc-400">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-zinc-800 pt-4 text-xs text-zinc-400 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame size={15} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center justify-end gap-1.5">
            <Star size={15} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}