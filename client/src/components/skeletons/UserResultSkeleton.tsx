import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
   count?: number;
}

export default function UserResultSkeleton({ count = 2 }: IProps) {
   return Array(count)
      .fill(null)
      .map((_, i) => (
         <div key={i} className="flex h-[56px] items-center gap-x-2 p-2">
            <Skeleton className="size-[40px] rounded-full" />
            <div className="flex flex-1 flex-col gap-y-1">
               <Skeleton className="h-[16px] w-[30%]" />
               <Skeleton className="h-[10px] w-[60%]" />
            </div>
            <Skeleton className="h-[40px] w-[44px] rounded-md" />
         </div>
      ));
}
