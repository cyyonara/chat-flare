import { useParams } from "react-router-dom";

interface IProps {}

export default function Conversation({}: IProps) {
  const { chatId } = useParams();

  return <div>{chatId}</div>;
}
