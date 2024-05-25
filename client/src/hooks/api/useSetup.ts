import {
  useMutation,
  UseMutationResult,
  MutationFunction,
} from "@tanstack/react-query";
import { IResponse, IRequestError } from "@/types";
import { uploadImage } from "@/services/firebase";
import axios from "axios";

interface IMutationResponse extends IResponse<{ newProfilePicture: string }> {}

const setupAccount: MutationFunction<
  { newProfilePicture: string },
  File
> = async (imageFile: File) => {
  const imageURL = await uploadImage(imageFile);
  const response = await axios.patch<IMutationResponse>(
    import.meta.env.VITE_API + "/api/user/profile-picture",
    {
      profilePicture: imageURL,
    },
    { withCredentials: true },
  );
  return response.data.data;
};

export const useSetup = (): UseMutationResult<
  { newProfilePicture: string },
  IRequestError,
  File
> => {
  return useMutation({
    mutationKey: ["set up"],
    mutationFn: setupAccount,
  });
};
