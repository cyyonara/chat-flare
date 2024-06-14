import { motion } from "framer-motion";
import { IMessageReactor } from "@/types";
import Reaction from "./Reaction";

interface IProps {
   messageId: string;
   currentUserId: string;
   reactors: IMessageReactor[];
   closeReactionPicker: () => void;
}

export default function ReactionPicker({
   messageId,
   currentUserId,
   reactors,
   closeReactionPicker,
}: IProps) {
   const reactions: string[] = ["❤️", "😄", "😮", "😢", "😠", "👍", "👎"];

   const isAlreadyReacted = reactors.find(
      (reactor) => reactor.user._id === currentUserId,
   );

   return (
      <>
         <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={closeReactionPicker}
         ></motion.div>
         <motion.div
            className="flex p-2 rounded-lg z-50 bg-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
         >
            {reactions.map((reaction) => (
               <Reaction
                  key={reaction}
                  messageId={messageId}
                  reaction={reaction}
                  isAlreadyReacted={!!isAlreadyReacted}
                  currentUserReaction={isAlreadyReacted?.reaction}
                  closeReactionPicker={closeReactionPicker}
               />
            ))}
         </motion.div>
      </>
   );
}
