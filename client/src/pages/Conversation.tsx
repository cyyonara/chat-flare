import { useChat } from "@/hooks/api/useChat";
import { useParams } from "react-router-dom";

interface IProps {}

export default function Conversation({}: IProps) {
  const { chatId } = useParams();
  const { data, error } = useChat(chatId as string);

  console.log(data);

  return (
    <div className="flex flex-1">
      <div className="flex-1"></div>
      <div className="w-[400px] border-l"></div>
    </div>
  );
}
