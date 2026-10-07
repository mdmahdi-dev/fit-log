import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16">
        
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.3em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
          >
            BROWSE WORKOUTS
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="relative min-h-[350px] lg:min-h-[550px]">
          <Image
            src="/banner.png"
            alt="FitLog workout banner"
            fill
            priority
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}