"use client";

interface ShowMoreButtonProps {
  onShowMore: () => void;
}

export default function ShowMoreButton({ onShowMore }: ShowMoreButtonProps) {
  return (
    <div className="flex justify-center mt-10">
      <button
        type="button"
        onClick={onShowMore}
        className="px-8 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-text-heading hover:bg-gray-50 transition-colors duration-150"
      >
        Show More Products
      </button>
    </div>
  );
}
