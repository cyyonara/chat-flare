import { IUser } from "@/types";
import Overlay from "@/components/common/Overlay";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { IoCloseOutline, IoPersonRemoveOutline } from "react-icons/io5";
import { MessageCircleMoreIcon } from "lucide-react";

interface IProps extends IUser {
  currentUserId: string;
  isAdmin: boolean;
  handleMessageUser: () => void;
  handleRemoveMember: () => void;
  closeMemberInfoModal: () => void;
}

export default function MemberInfoModal({
  _id,
  username,
  email,
  profilePicture,
  currentUserId,
  isAdmin,
  handleMessageUser,
  handleRemoveMember,
  closeMemberInfoModal,
}: IProps) {
  return (
    <Overlay onClick={closeMemberInfoModal}>
      <motion.div
        className="max-w-[450px] flex-1"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="relative p-6">
          <Button
            variant="outline"
            className="absolute right-[24px] top-[24px] size-[30px] p-0 text-center"
            onClick={closeMemberInfoModal}
          >
            <IoCloseOutline />
          </Button>
          <div className="mt-9 flex flex-col items-center gap-y-5">
            <Avatar className="size-[130px]">
              <AvatarImage
                src={profilePicture}
                className="object-cover object-center"
              />
              <AvatarFallback className="uppercase">
                {username.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-center text-xl font-semibold">
                {username}
              </div>
              <div className="flex items-center gap-x-1 text-center text-sm text-muted-foreground">
                <MdEmail />
                <span>{email}</span>
              </div>
            </div>
            <div className="mb-12 mt-2 flex items-center gap-x-6">
              {currentUserId !== _id && (
                <>
                  <div className="flex flex-col items-center gap-y-1">
                    <Button
                      variant="secondary"
                      className="size-[45px] rounded-full p-0 text-center"
                      onClick={handleMessageUser}
                    >
                      <MessageCircleMoreIcon size={20} />
                    </Button>
                    <div className="text-sm text-muted-foreground">Message</div>
                  </div>
                  {isAdmin && (
                    <div className="flex flex-col items-center gap-y-1">
                      <Button
                        variant="destructive"
                        className="size-[45px] rounded-full p-0 text-center"
                        onClick={handleRemoveMember}
                      >
                        <IoPersonRemoveOutline size={20} />
                      </Button>
                      <div className="text-sm text-muted-foreground">
                        Remove
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </Overlay>
  );
}
