"use client";

import { RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <RefreshCw size={20} className="text-red-400" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-text-heading">
          Failed to load products
        </p>
        <p className="text-xs text-text-muted mt-1 max-w-xs leading-relaxed">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand text-white text-xs font-medium hover:bg-brand-hover transition-colors duration-150"
      >
        <RefreshCw size={12} />
        Try again
      </button>
    </div>
  );
}
