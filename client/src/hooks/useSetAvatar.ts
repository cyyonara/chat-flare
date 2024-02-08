import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IResponse, IRequestError, IUserCredential } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { uploadImage } from "@/services/firebase-service";

type TMutationResponse = IResponse<IUserCredential>;

const setAvatar = async (imageFile: File): Promise<TMutationResponse> => {
  const { success, imageUrl, errorMessage } = await uploadImage(imageFile);

  if (!success) throw new AxiosError(errorMessage);

  const response = await axios.put<TMutationResponse>(
    import.meta.env.VITE_API + "/api/user/account/setup",
    { avatar: imageUrl },
    { withCredentials: true },
  );
  return response.data;
};

export const useSetAvatar = (): UseMutationResult<
  TMutationResponse,
  IRequestError,
  File
> => {
  return useMutation<TMutationResponse, IRequestError, File>({
    mutationKey: ["set-avatar"],
    mutationFn: setAvatar,
  });
};
