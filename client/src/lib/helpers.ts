import { useAuth } from "@/hooks/custom/useAuth";
import { IUser, IMessage, IChatUser } from "@/types";

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
    messageInfo = " sent a photo";
  } else if (lastMessage.isLeaveMessage) {
    messageInfo = " leave the group";
  } else {
    messageInfo = `: ${lastMessage.content}`;
  }

  return `${getUserInfo(lastMessage.sender) + messageInfo}`;
};

export const getChatMateInfo = (chatUser: IChatUser[]): IChatUser => {
  const currentUserId = useAuth().user!._id;
  return chatUser.find((user) => user._id !== currentUserId) as IChatUser;
};
