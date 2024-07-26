import { api } from "@/config/axios.config";
import { IRequestError, IResponse, IChat, IUser } from "@/types";
import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";

const addGroupMember: MutationFunction<IChat> = async (users, chatId) => {
  const response = await api.patch(import.meta.env.VITE_API);
};
