import { IChatUser } from '@/types';
import { useMemo } from 'react';
import Member from '@/components/chats/Member';

interface IProps {
  members: IChatUser[];
}

export default function Members({ members }: IProps) {
  const sortedMembers = useMemo(
    () =>
      members.sort((a, b) => {
        if (a.user.username.toLowerCase() < b.user.username.toLowerCase()) {
          return -1;
        } else {
          return +1;
        }
      }),
    []
  );

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='text-muted-foreground text-sm'>Members</div>
      <div className='flex flex-col gap-y-1 max-h-[400px] overflow-y-auto custom-scroll'>
        {sortedMembers.map((member) => (
          <Member
            key={member._id}
            _id={member._id}
            user={member.user}
            hasLeft={member.hasLeft}
          />
        ))}
      </div>
    </div>
  );
}
