import { IChatUser } from "@/types";
import Member from "@/components/chats/Member";
import { useAuth } from "@/hooks/states/useAuth";

interface IProps {
  members: IChatUser[];
  groupAdminId: string;
}

export default function Members({ members, groupAdminId }: IProps) {
  const currentUserId = useAuth((state) => state.user!._id);

  const sortedMembers = members.sort((a, b) => {
    if (a.user.username.toLowerCase() < b.user.username.toLowerCase()) {
      return -1;
    } else {
      return +1;
    }
  });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="text-sm text-muted-foreground">Members</div>
      <div className="flex flex-col gap-y-1">
        {sortedMembers.map((member) => (
          <Member
            key={member._id}
            _id={member._id}
            user={member.user}
            hasLeft={member.hasLeft}
            isAdmin={groupAdminId === currentUserId}
          />
        ))}
      </div>
    </div>
  );
}
