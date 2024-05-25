import {
  useMutation,
  UseMutationResult,
  MutationFunction,
} from "@tanstack/react-query";
import { IResponse, IRequestError, INewChat, IChat } from "@/types";
import axios from "axios";

interface IMutationResponse extends IResponse<IChat> {}

const createChat: MutationFunction<IChat, INewChat> = async ({
  users,
  ...rest
}) => {
  const response = await axios.post<IMutationResponse>(
    import.meta.env.VITE_API + "/api/chats",
    { ...rest, users: users.map((user) => user._id) },
    { withCredentials: true },
  );
  return response.data.data;
};

export const useCreateChat = (): UseMutationResult<
  IChat,
  IRequestError,
  INewChat
> => {
  return useMutation({
    mutationKey: ["add-chat"],
    mutationFn: createChat,
  });
};
