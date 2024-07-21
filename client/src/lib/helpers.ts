import { useAuth } from '@/hooks/states/useAuth';
import { IUser, IMessage, IChatUser, IChat } from '@/types';

export const checkImage = (file: File): boolean => {
  const allowedFileExt: string[] = ['jpeg', 'jpg', 'png', 'webp'];
  const fileExt = file.name.split('.');
  const actualFileExt = fileExt[fileExt.length - 1];

  const isFileAllowed = allowedFileExt.find(
    (fileExt) => fileExt === actualFileExt.toLowerCase()
  );
  return !!isFileAllowed;
};

export const getUserInfo = (anotherUser: IUser): string => {
  const currentUserId = useAuth().user!._id;
  return currentUserId === anotherUser._id ? 'You' : anotherUser.username;
};

export const getLastMessageInfo = (lastMessage: IMessage): string => {
  let messageInfo: string;

  if (lastMessage.isImage) {
    messageInfo = ' sent a photo.';
  } else if (lastMessage.isLeaveMessage) {
    messageInfo = ' leave the group.';
  } else {
    messageInfo = `: ${lastMessage.content}`;
  }

  return `${getUserInfo(lastMessage.sender) + messageInfo}`;
};

export const getChatMateInfo = (
  chatUsers: IChatUser[],
  currentUserId: string
): IChatUser | undefined => {
  return chatUsers
    ? chatUsers.find((user) => user.user._id !== currentUserId)
    : undefined;
};

export const isInChat = (chat: IChat, currentUserId: string): boolean => {
  return !!chat.users.find(
    (userObj) => userObj.user._id === currentUserId && !userObj.hasLeft
  );
};
