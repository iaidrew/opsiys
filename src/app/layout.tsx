import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Syne, DM_Sans } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Opsiys — AI Tools Directory",
  description: "Discover the most powerful AI tools for founders, creators and businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <body className="relative text-white min-h-screen overflow-x-hidden font-[var(--font-dm)] bg-black antialiased">

        {/* ── GLOBAL ANIMATED BACKGROUND ─────────────────── */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">

          {/* Primary red glow — top right */}
          <div
            className="animate-orb-drift"
            style={{
              position: "absolute",
              width: "900px",
              height: "900px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(239,68,68,0.13) 0%, transparent 65%)",
              top: "-350px",
              right: "-250px",
              filter: "blur(70px)",
            }}
          />

          {/* Secondary red glow — bottom left */}
          <div
            className="animate-orb-drift-alt"
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
              bottom: "-150px",
              left: "-180px",
              filter: "blur(90px)",
            }}
          />

          {/* Accent glow — center fade */}
          <div
            style={{
              position: "absolute",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(251,146,60,0.05) 0%, transparent 70%)",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(100px)",
            }}
          />

          {/* Ultra-fine grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(239,68,68,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.04) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
            }}
          />

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)",
            }}
          />

        </div>

        {/* ── APP SHELL ───────────────────────────────────── */}
        <AuthProvider>
          <Navbar />

          <main className="relative z-10 pt-16 min-h-screen page-enter">
            {children}
          </main>

          <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}