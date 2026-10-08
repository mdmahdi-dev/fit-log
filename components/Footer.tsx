import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo and tagline */}
        <div>
          <Image
            src="/logo.png"
            alt="FitLog"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />

          <p className="mt-2 text-sm text-zinc-500">
            Train with intent. Log every set.
          </p>
        </div>

        {/* Copyright */}
        <p className="text-sm text-zinc-500">
          © 2026 FitLog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}