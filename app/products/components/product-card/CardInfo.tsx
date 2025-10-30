"use client";

interface CardInfoProps {
  title: string;
  subcategory: string;
  price: number;
}

export function CardInfo({ title, subcategory, price }: CardInfoProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col z-10 bg-gradient-to-t from-slate-950/80 to-transparent">
      <h3 className="text-slate-100 font-semibold text-[15px] truncate tracking-tight group-hover:text-sky-300 transition">
        {title}
      </h3>
      <p className="text-slate-400 text-xs mb-1">{subcategory}</p>

      <div className="flex items-center justify-between mt-1">
        <span className="text-sky-400/90 font-semibold text-sm bg-slate-900/60 border border-slate-800 rounded-full px-2.5 py-1 backdrop-blur-sm">
          {price.toLocaleString()} EGP
        </span>
      </div>
    </div>
  );
}


