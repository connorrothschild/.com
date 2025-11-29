import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-section py-section relative flex min-h-screen flex-col items-center justify-center text-center bg-bg text-text">
      <h1 className="text-[96px] font-display tracking-display mb-2 w-full select-none text-center text-inherit">
        404
      </h1>

      <p className="text-center">This page does not exist.</p>

      <div className="mt-12">
        <Link
          className="flex w-max items-center gap-2 rounded-sm bg-bg border border-text px-4 py-3 text-text"
          href="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back home
        </Link>
      </div>
    </section>
  );
}
