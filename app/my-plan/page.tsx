"use client";

import Link from "next/link";
import { Clock, Flame, Trash2 } from "lucide-react";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFitLog } from "@/components/FitLogProvider";

export default function MyPlanPage() {
    const {
        plan,
        saved,
        doneIds,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
    } = useFitLog();

    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
    const [toast, setToast] = useState<string | null>(null);

    function showToast(message: string) {
        setToast(message);

        window.setTimeout(() => {
            setToast(null);
        }, 2500);
    }

    const totalMinutes = plan.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    const workouts = activeTab === "plan" ? plan : saved;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-16">
                {/* Header */}
                <section>
                    <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
                        YOUR WORKOUTS
                    </p>

                    <h1 className="mt-3 text-5xl font-black uppercase">
                        My Plan
                    </h1>

                    <p className="mt-4 text-zinc-400">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </section>

                {/* Metrics */}
                <section className="mt-10 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                        <p className="text-sm text-zinc-500">
                            Exercises
                        </p>

                        <p className="mt-2 text-3xl font-black">
                            {plan.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                        <p className="text-sm text-zinc-500">
                            Minutes
                        </p>

                        <p className="mt-2 text-3xl font-black">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                        <p className="text-sm text-zinc-500">
                            Calories
                        </p>

                        <p className="mt-2 text-3xl font-black">
                            {totalCalories}
                        </p>
                    </div>
                </section>

                {/* Tabs */}
                <div className="mt-12 flex gap-3 border-b border-zinc-800 pb-4">
                    <button
                        type="button"
                        onClick={() => setActiveTab("plan")}
                        className={`rounded-full px-5 py-2 text-sm font-bold transition ${activeTab === "plan"
                            ? "bg-lime-400 text-black"
                            : "border border-zinc-700 text-zinc-400 hover:text-white"
                            }`}
                    >
                        Today's Plan ({plan.length})
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("saved")}
                        className={`rounded-full px-5 py-2 text-sm font-bold transition ${activeTab === "saved"
                            ? "bg-lime-400 text-black"
                            : "border border-zinc-700 text-zinc-400 hover:text-white"
                            }`}
                    >
                        Saved ({saved.length})
                    </button>
                </div>

                {/* Workout list */}
                {workouts.length === 0 ? (
                    <section className="py-24 text-center">
                        <h2 className="text-3xl font-black uppercase">
                            Nothing Here Yet
                        </h2>

                        <p className="mx-auto mt-4 max-w-md text-zinc-400">
                            Browse the library and add a lift to get today moving.
                        </p>

                        <Link
                            href="/#library"
                            className="mt-8 inline-flex rounded-full bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
                        >
                            Go to Workouts
                        </Link>
                    </section>
                ) : (
                    <section className="mt-8 grid gap-5">
                        {workouts.map((workout) => (
                            <article
                                key={workout.id}
                                className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center"
                            >
                                {/* Image */}
                                <img
                                    src={workout.image}
                                    alt={workout.name}
                                    className="h-40 w-full rounded-xl object-cover sm:h-28 sm:w-40"
                                />

                                {/* Info */}
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold">
                                        {workout.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        {workout.equipment}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={16} />
                                            {workout.duration} min
                                        </span>

                                        <span className="flex items-center gap-1.5">
                                            <Flame size={16} />
                                            {workout.caloriesBurned} kcal
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href={`/workout/${workout.id}`}
                                        className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
                                    >
                                        View Details
                                    </Link>

                                    {activeTab === "plan" ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    markAsDone(workout.id);
                                                    showToast("Workout marked as done.");
                                                }}
                                                disabled={doneIds.includes(workout.id)}
                                                className="rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {doneIds.includes(workout.id)
                                                    ? "Done"
                                                    : "Mark as Done"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    removeFromPlan(workout.id);
                                                    showToast(
                                                        "Workout removed from today's plan."
                                                    );
                                                }}
                                                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold transition hover:border-red-400 hover:text-red-400"
                                            >
                                                <Trash2 size={16} />
                                                Remove
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeFromSaved(workout.id);
                                                showToast("Workout removed from saved.");
                                            }}
                                            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold transition hover:border-red-400 hover:text-red-400"
                                        >
                                            <Trash2 size={16} />
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </article>
                        ))}
                    </section>
                )}

            </main>

            <Footer />

            {toast && (
                <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
                    {toast}
                </div>
            )}
        </div>
    );
}