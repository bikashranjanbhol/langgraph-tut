import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <LogoMark className="h-12 w-12" />
      <p className="mt-6 font-mono text-sm font-semibold text-brand-500">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
        This node isn&apos;t in the graph
      </h1>
      <p className="mt-3 text-ink-500 dark:text-ink-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s route you back to a known state.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-400/50 dark:border-ink-700 dark:text-ink-200"
        >
          Browse tutorials
        </Link>
      </div>
    </div>
  );
}
