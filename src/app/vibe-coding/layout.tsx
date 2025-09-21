import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Link from "next/link";

export default function VibeCodingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-sm border-r border-white/10 z-10 overflow-y-auto">
        <div className="p-8">
          <h2 className="text-xl font-light mb-8 text-white">Vibe Coding</h2>
          <nav className="space-y-2">
            <Link
              href="/vibe-coding/history"
              className="block text-white/60 hover:text-white transition-colors text-sm py-2"
            >
              History
            </Link>
            <Link
              href="/vibe-coding/failures"
              className="block text-white/60 hover:text-white transition-colors text-sm py-2"
            >
              Failures
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80">{children}</div>
    </div>
  );
}
