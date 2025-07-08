import { Header } from "@/components/header";
import { MeshGradientComponent } from "@/components/mesh-gradient";
import "@concise-docs/ui/globals.css";
import { DesignSystemProvider } from "@concise-docs/ui/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Concise Docs",
  description: "Concise Docs is a document summarization system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-svh`}
      suppressHydrationWarning
    >
      <body className="h-svh min-h-svh max-w-screen overflow-hidden bg-slate-1 text-slate-12 antialiased opacity-0 transition-opacity duration-75">
        <DesignSystemProvider>
          <MeshGradientComponent
            colors={["#4429bc", "#b8a8ff", "#4429bc"]}
            speed={1.5}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <div className="relative z-[1] mx-auto flex h-full w-full flex-col">
            <div className="flex h-full flex-1 flex-col gap-8 px-5 py-4">
              <Header />
              <main className="mx-auto flex h-full w-full max-w-screen-lg justify-center overflow-auto">
                {children}
              </main>
            </div>
            <div className="bg-white text-center text-indigo-900">
              <p>&copy; 2025 ConciseDocs. All rights reserved.</p>
            </div>
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
