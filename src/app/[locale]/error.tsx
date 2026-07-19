"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-app-bg text-app-text flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse">
              <AlertTriangle size={48} className="text-red-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
              !
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-4">
          Something went wrong
        </h1>
        <p className="text-app-muted mb-8 leading-relaxed">
          An unexpected error occurred. Don&apos;t worry, you can try again or
          go back to the homepage.
        </p>

        {/* Error digest (for debugging) */}
        {error.digest && (
          <p className="text-xs text-app-muted/50 mb-6 font-mono bg-white/5 px-4 py-2 rounded-lg inline-block">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="group bg-gradient-to-r from-primary to-emerald-400 text-black font-bold text-lg py-3 px-8 rounded-xl hover:brightness-110 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25 flex items-center justify-center gap-3"
          >
            <RefreshCw
              size={20}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="bg-white/5 text-app-text font-bold text-lg py-3 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 flex items-center justify-center gap-3"
          >
            <Home size={20} />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
