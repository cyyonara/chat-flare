import Overlay from "@/components/common/Overlay";
import { IMessageReactor } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/custom/useAuth";

interface IProps {
   reactors: IMessageReactor[];
   close: () => void;
}

export default function ReactorsList({ reactors, close }: IProps) {
   const currentUserId = useAuth((state) => state.user?._id);

   return (
      <Overlay onClick={close}>
         <div className="flex-1 max-w-[450px]">
            <Card>
               <CardHeader>
                  <div className="flex items-center flex-row justify-between">
                     <p>Reactions</p>
                     <button className="rounded-full bg-secondary p-1 hover:bg-secondary/80">
                        <X size={15} />
                     </button>
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="flex flex-col gap-y-2">
                     {reactors.map((reactor, i) => (
                        <div
                           key={i}
                           className="flex items-center justify-between"
                        >
                           <div className="flex items-center gap-x-2">
                              <Avatar className="size-[30px]">
                                 <AvatarImage
                                    src={reactor.user.profilePicture}
                                 />
                                 <AvatarFallback className="uppercase">
                                    {reactor.user.username.substring(0, 2)}
                                 </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col text-white">
                                 <p className="text-sm">
                                    {currentUserId === reactor.user._id
                                       ? "You"
                                       : reactor.user.username}
                                 </p>
                                 {currentUserId !== reactor.user._id && (
                                    <p className="text-xs text-muted-foreground">
                                       {reactor.user.email}
                                    </p>
                                 )}
                              </div>
                           </div>
                           <div className="text-lg">{reactor.reaction}</div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </Overlay>
   );
}
