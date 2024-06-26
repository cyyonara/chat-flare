import { cn } from "@/lib/utils";
import { IMessageReactor } from "@/types";

interface IProps {
   reactors: IMessageReactor[];
   position: "right" | "left";
   variant: "primary" | "secondary";
   showReactorsList: () => void;
}

export default function MessageReactions({
   reactors,
   position,
   variant,
   showReactorsList,
}: IProps) {
   const filteredReactions: string[] = [];

   const filterReactions = () => {
      reactors.forEach((reactor) => {
         const inFilteredReactions = filteredReactions.find(
            (reaction) => reaction === reactor.reaction,
         );

         if (!inFilteredReactions && filteredReactions.length < 3) {
            filteredReactions.push(reactor.reaction);
         }
      });
   };
   filterReactions();

   return (
      <div
         className={cn(
            "bg-primary text-secondary absolute z-10 flex items-center gap-x-[2px] top-[calc(100%-4px)] left-[calc(100%-16px)] rounded-full py-[2px] px-1 cursor-pointer text-white",
            {
               "right-[calc(100%-18px)] left-auto": position === "left",
               "bg-secondary": variant === "secondary",
            },
         )}
         onClick={showReactorsList}
      >
         {filteredReactions.map((reaction) => (
            <div key={reaction} className="text-[8px]">
               {reaction}
            </div>
         ))}
         <div className="text-[10px]">{reactors.length}</div>
      </div>
   );
}
