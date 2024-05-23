import { IChat } from "@/types";
import { formatDistanceStrict } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getLastMessageInfo, getUserInfo } from "@/lib/helpers";

interface IProps extends IChat {}

export default function GroupChat({
  _id,
  chatPhoto,
  chatName,
  chatCreator,
  lastMessage,
  updatedAt,
}: IProps) {
  return (
    <div className="flex items-center gap-x-3 rounded-md p-2">
      <Avatar>
        <AvatarImage src={chatPhoto} />
        <AvatarFallback className="uppercase">
          {chatName.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col">
        <p className="font-semibold">{chatName}</p>
        <div className="flex items-end gap-x-2">
          <p className="line-clamp-1 text-sm">
            {lastMessage
              ? getLastMessageInfo(lastMessage)
              : getUserInfo(chatCreator) + " started a group chat"}
          </p>
          <span className="ml-auto whitespace-nowrap text-xs leading-5 text-gray-500">
            {formatDistanceStrict(new Date(updatedAt), new Date())} ago
          </span>
        </div>
      </div>
    </div>
  );
}
