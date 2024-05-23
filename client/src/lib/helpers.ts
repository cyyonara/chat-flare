import { useAuth } from "@/hooks/custom/useAuth";
import { IUser, IMessage } from "@/types";

export const checkImage = (file: File) => {
  const allowedFileExt: string[] = ["jpeg", "jpg", "png", "webp"];
  const fileExt = file.name.split(".");
  const actualFileExt = fileExt[fileExt.length - 1];

  const isFileAllowed = allowedFileExt.find(
    (f) => f === actualFileExt.toLowerCase(),
  );
  return isFileAllowed ? true : false;
};

export const getUserInfo = (anotherUser: IUser): string => {
  const currentUserId = useAuth().user!._id;
  return currentUserId === anotherUser._id ? "You" : anotherUser.username;
};

export const getLastMessageInfo = (lastMessage: IMessage): string => {
  let messageInfo: string;

  if (lastMessage.isImage) {
    messageInfo = "sent a photo";
  } else if (lastMessage.isLeaveMessage) {
    messageInfo = "leave the group";
  } else {
    messageInfo = "sent a message";
  }

  return `${getUserInfo(lastMessage.sender)} ${messageInfo}`;
};
