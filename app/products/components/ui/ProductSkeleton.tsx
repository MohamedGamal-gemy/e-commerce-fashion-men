import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye } from "lucide-react";

export function ProductSkeleton() {
  return (
    <Card className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-xl shadow-md p-0">
      {/* Image Skeleton */}
      <div className="relative h-80 w-full overflow-hidden">
        <Skeleton className="h-full w-full bg-slate-800/60 rounded-none" />

        {/* Eye Icon Placeholder */}
        <div className="absolute top-3 right-3 bg-slate-950/60 p-2 rounded-full">
          <Eye size={18} className="text-slate-700" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

      {/* Text placeholders */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col bg-gradient-to-t from-slate-950/90 to-transparent space-y-2">
        <Skeleton className="h-4 w-2/3 bg-slate-800/80 rounded-md" />
        <Skeleton className="h-3 w-1/2 bg-slate-800/60 rounded-md" />

        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-4 w-16 bg-slate-800/80 rounded-md" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-3 w-3 rounded-sm bg-slate-800/70"
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
