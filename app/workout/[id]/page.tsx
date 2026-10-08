
import { Clock, Flame, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { getWorkouts } from "@/lib/api";
import Navbar from "@/components/Navbar";
import WorkoutActions from "@/components/WorkoutActions";
import Footer from "@/components/Footer";


interface WorkoutDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function WorkoutDetailsPage({
    params,
}: WorkoutDetailsPageProps) {
    const { id } = await params;

    const workouts = await getWorkouts();

    const workout = workouts.find(
        (item) => item.id === Number(id)
    );

    if (!workout) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    {/* Main details */}
                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Image */}
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src={workout.image}
                                alt={workout.name}
                                className="h-full min-h-[400px] w-full object-cover"
                            />
                        </div>

                        {/* Information */}
                        <div>
                            <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
                                WORKOUT DETAILS
                            </p>

                            <h1 className="mt-4 text-5xl font-black uppercase leading-tight">
                                {workout.name}
                            </h1>

                            <p className="mt-6 leading-7 text-zinc-400">
                                {workout.description}
                            </p>

                            {/* Tags */}
                            <div className="mt-6 flex flex-wrap gap-2">
                                {workout.muscleGroups.map((muscle) => (
                                    <span
                                        key={muscle}
                                        className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                                    >
                                        {muscle}
                                    </span>
                                ))}

                                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                                    {workout.difficulty}
                                </span>
                            </div>

                            {/* Stats */}
                            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Equipment
                                    </p>
                                    <p className="mt-2 font-bold">{workout.equipment}</p>
                                </div>

                                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Difficulty
                                    </p>

                                    <p className="mt-2 font-bold">
                                        {workout.difficulty}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Sets
                                    </p>
                                    <p className="mt-2 font-bold">{workout.sets}</p>
                                </div>

                                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Reps
                                    </p>
                                    <p className="mt-2 font-bold">{workout.reps}</p>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 p-4">
                                    <Clock size={18} />
                                    <span>{workout.duration} min</span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 p-4">
                                    <Flame size={18} />
                                    <span>{workout.caloriesBurned} kcal</span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 p-4">
                                    <Star size={18} />
                                    <span>{workout.rating}</span>
                                </div>
                            </div>
                        </div>

                        <WorkoutActions workout={workout} />
                    </div>

                    {/* Instructions */}
                    <section className="mt-16 max-w-3xl">
                        <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
                            HOW TO PERFORM
                        </p>

                        <h2 className="mt-3 text-3xl font-black uppercase">
                            Instructions
                        </h2>

                        <ol className="mt-8 space-y-5">
                            {workout.instructions.map((instruction, index) => (
                                <li
                                    key={instruction}
                                    className="flex gap-4 border-b border-zinc-800 pb-5"
                                >
                                    <span className="text-xl font-black text-lime-400">
                                        {index + 1}
                                    </span>

                                    <p className="leading-7 text-zinc-400">
                                        {instruction}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}