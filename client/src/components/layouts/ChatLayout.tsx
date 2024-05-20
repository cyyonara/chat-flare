import Sidebar from "@/components/chats/Sidebar";

interface IProps {}

export default function ChatLayout({}: IProps) {
  return (
    <div className="flex">
      <Sidebar />
    </div>
  );
}
