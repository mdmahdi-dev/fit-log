import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <Hero />

        <section
          id="library"
          className="mx-auto max-w-7xl px-6 py-20"
        >
          <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase">
            The Library
          </h2>

          <p className="mt-3 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </section>
      </main>
    </div>
  );
}