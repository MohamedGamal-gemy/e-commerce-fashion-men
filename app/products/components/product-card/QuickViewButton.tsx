"use client";

import { Eye } from "lucide-react";

interface QuickViewButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function QuickViewButton({ onClick }: QuickViewButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 z-40 bg-slate-950/70 backdrop-blur-sm p-2 rounded-full text-slate-300 hover:text-white hover:bg-sky-700/60 transition transform-gpu hover:scale-105"
    >
      <Eye size={18} />
    </button>
  );
}


