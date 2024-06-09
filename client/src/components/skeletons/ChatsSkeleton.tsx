import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  count?: number;
}

export default function ChatsSkeleton({ count = 2 }: IProps) {
  return Array(count)
    .fill(null)
    .map((_, i) => (
      <div key={i} className="flex h-[60px] items-center gap-x-3 p-2">
        <Skeleton className="size-[40px] rounded-full" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-[16px] w-[100px]" />
          <Skeleton className="h-[12px] w-[150px]" />
        </div>
      </div>
    ));
}
