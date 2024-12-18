import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col items-center space-y-3 animate-pulse">
      {/* Скелетон для изображения */}
      <Skeleton className="w-full h-[250px] sm:h-[300px] lg:h-[300px] rounded-lg" />
      {/* Скелетон для текста */}
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[30%]" />
      </div>
    </div>
  );
}
