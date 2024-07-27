import { FaImages } from "react-icons/fa";
import { useGetChatImages } from "@/hooks/api/useGetChatImages";
import { ReactNode } from "react";

interface IProps {}

export default function ChatImagesContainer({}: IProps) {
  const { data, isLoading, isError, isSuccess } = useGetChatImages();

  let chatImagesContainerContent: ReactNode;

  if (isLoading) {
    chatImagesContainerContent = <h2>Loading...</h2>;
  }

  if (isError) {
    chatImagesContainerContent = <h2>Error...</h2>;
  }

  if (isSuccess) {
    chatImagesContainerContent = (
      <div className="flex gap-x-1">
        {data.pages[0].messages.map((imageMessage) => (
          <></>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className="flex items-center gap-x-2">
          <FaImages />
          <span>Images</span>
        </div>
        <div className="rounded-full bg-primary px-2 text-sm">23</div>
      </div>
      {chatImagesContainerContent}
    </div>
  );
}
