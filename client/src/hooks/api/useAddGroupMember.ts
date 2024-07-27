import { api } from "@/config/axios.config";
import { IRequestError, IResponse, IChat, IAddGroupMemberData } from "@/types";
import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";

type TMutationResponse = IResponse<IChat>;

const addGroupMember: MutationFunction<IChat, IAddGroupMemberData> = async ({
  users,
  chatId,
}) => {
  const response = await api.patch<TMutationResponse>(
    import.meta.env.VITE_API + `/api/chats/${chatId}/members`,
    { usersId: users.map((user) => user._id) },
  );
  return response.data.data;
};

export const useAddGroupMember = (): UseMutationResult<
  IChat,
  IRequestError,
  IAddGroupMemberData
> => {
  return useMutation({ mutationFn: addGroupMember });
};
