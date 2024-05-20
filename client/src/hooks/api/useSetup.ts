import {
  useMutation,
  UseMutationResult,
  MutationFunction,
} from "@tanstack/react-query";
import { IResponse, IRequestError } from "@/types";
import { uploadImage } from "@/services/firebase";
import axios from "axios";

interface IMutationResponse extends IResponse<{ newProfilePicture: string }> {}

const setupAccount: MutationFunction<IMutationResponse, File> = async (
  imageFile: File,
) => {
  const imageURL = await uploadImage(imageFile);
  const response = await axios.patch<IMutationResponse>(
    import.meta.env.VITE_API + "user/profile-picture",
    {
      profilePicture: imageURL,
    },
    { withCredentials: true },
  );
  return response.data;
};

export const useSetup = (): UseMutationResult<
  IMutationResponse,
  IRequestError,
  File
> => {
  return useMutation<IMutationResponse, IRequestError, File>({
    mutationKey: ["set up"],
    mutationFn: setupAccount,
  });
};
