"use client";

import { Bookmark, Check, Plus } from "lucide-react";
import { useState } from "react";

import { useFitLog } from "@/components/FitLogProvider";
import { Workout } from "@/types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    plan,
    saved,
    addToPlan,
    saveWorkout,
  } = useFitLog();

  const [toast, setToast] = useState<string | null>(null);

  const alreadyInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 2500);
  }

  function handleAddToPlan() {
    if (plan.length >= 5) {
      showToast("Today's plan is full.");
      return;
    }

    if (alreadyInPlan) {
      showToast("Already in today's plan.");
      return;
    }

    addToPlan(workout);
    showToast("Added to today's plan.");
  }

  function handleSave() {
    if (alreadySaved) {
      showToast("Already saved.");
      return;
    }

    saveWorkout(workout);
    showToast("Workout saved for later.");
  }

  return (
    <div className="relative mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToPlan}
          disabled={alreadyInPlan || plan.length >= 5}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {alreadyInPlan ? (
            <Check size={18} />
          ) : (
            <Plus size={18} />
          )}

          {alreadyInPlan ? "Added to Plan" : "Add to Today's Plan"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={alreadySaved}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 px-6 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {alreadySaved ? (
            <Check size={18} />
          ) : (
            <Bookmark size={18} />
          )}

          {alreadySaved ? "Saved" : "Save for Later"}
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}