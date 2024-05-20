import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/custom/useAuth";

interface IProps {}

export default function Sidebar({}: IProps) {
  const user = useAuth((state) => state.user);

  return (
    <div className="flex h-screen w-[350px] flex-col border-r">
      <div className="flex items-center border-b p-5">
        <Avatar>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback className="uppercase">
            {user?.username.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
