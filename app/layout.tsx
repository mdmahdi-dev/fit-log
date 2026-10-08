import type { Metadata } from "next";
import "./globals.css";
import { FitLogProvider } from "@/components/FitLogProvider";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          {children}
        </FitLogProvider>
      </body>
    </html>
  );
}