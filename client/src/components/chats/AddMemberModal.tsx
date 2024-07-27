import Overlay from "@/components/common/Overlay";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputIcon from "@/components/common/InputIcon";
import { Search } from "lucide-react";
import { useRef, useState, useEffect, useCallback, ReactNode } from "react";
import { useDebounce } from "@/hooks/states/useDebounce";
import { useSearchNonExistingGroupMember } from "@/hooks/api/useSearchNonExistingGroupMember";
import { useInView } from "react-intersection-observer";
import { IChat, IUser } from "@/types";
import SearchedGroupMember from "@/components/user/SearchedGroupMember";
import UserResultSkeleton from "@/components/skeletons/UserResultSkeleton";
import UserSearchError from "@/components/error/UserSearchError";
import SelectedUser from "@/components/user/SelectedUser";
import { useAddGroupMember } from "@/hooks/api/useAddGroupMember";
import { useParams } from "react-router-dom";
import { useLogout } from "@/hooks/api/useLogout";
import { useAuth } from "@/hooks/states/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { socket } from "@/components/providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  closeAddMemberModal: () => void;
}

export default function AddMemberModal({ closeAddMemberModal }: IProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const debounceValue = useDebounce(searchKeyword);
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    fetchNextPage,
    refetch,
  } = useSearchNonExistingGroupMember(debounceValue);
  const { mutate: addGroupMember, isPending } = useAddGroupMember();
  const { mutate: logout } = useLogout();
  const { chatId } = useParams();
  const { ref, inView } = useInView();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const clearCredentials = useAuth((state) => state.clearCredentials);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  let addMemberModalContent: ReactNode;

  const handleSelectedUsers = useCallback((check: boolean, user: IUser) => {
    if (check) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      setSelectedUsers((prev) => prev.filter(({ _id }) => _id !== user._id));
    }
  }, []);

  const handleAddMembers = () => {
    if (!selectedUsers.length) return;
    addGroupMember(
      { users: selectedUsers, chatId: chatId as string },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["chats", chatId], (): IChat => data);
          toast({
            title: "Success!",
            description: "Members successfully added.",
          });
          socket.emit("update-chat", data);
          closeAddMemberModal();
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            logout(null, { onSuccess: clearCredentials });
          } else {
            toast({
              title: "Oops!",
              description:
                error.response?.data.message || "Something went wrong.",
            });
          }
        },
      },
    );
  };

  if (isLoading || isFetching) {
    addMemberModalContent = (
      <div className="mt-5">
        <UserResultSkeleton count={3} />
      </div>
    );
  }

  if (isError) {
    addMemberModalContent = (
      <div className="mt-5">
        <UserSearchError retry={() => refetch()} />
      </div>
    );
  }

  if (isSuccess) {
    addMemberModalContent = (
      <div className="mt-5 flex flex-col gap-y-2">
        <>
          {!data.pages[0].users.length ? (
            <p className="text-center">No users found.</p>
          ) : (
            data.pages.map((page) =>
              page.users.map((user) => (
                <SearchedGroupMember
                  key={user._id}
                  _id={user._id}
                  username={user.username}
                  email={user.email}
                  profilePicture={user.profilePicture}
                  selectedUsers={selectedUsers}
                  handleSelectedUsers={handleSelectedUsers}
                />
              )),
            )
          )}
          <div ref={ref}></div>
        </>
      </div>
    );
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [isSuccess, isLoading, isFetching, isError]);

  return (
    <Overlay onClick={closeAddMemberModal}>
      <motion.div
        className="max-w-[450px] flex-1"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card>
          <CardHeader>
            <CardTitle>Add people</CardTitle>
            <CardDescription>
              Let other people join to your group.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InputIcon
              type="text"
              icon={<Search />}
              iconPos="left"
              placeholder="Search"
              ref={inputRef}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            {selectedUsers.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-1 overflow-y-auto">
                {selectedUsers.map((user) => (
                  <SelectedUser
                    key={user._id}
                    _id={user._id}
                    username={user.username}
                    email={user.email}
                    profilePicture={user.profilePicture}
                    handleSelectedUsers={handleSelectedUsers}
                    isLoading={isPending}
                  />
                ))}
              </div>
            )}
            {addMemberModalContent}
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-x-2">
            <Button variant="secondary" onClick={closeAddMemberModal}>
              Close
            </Button>
            <Button
              disabled={
                searchKeyword === "" || selectedUsers.length < 1 || isPending
              }
              onClick={handleAddMembers}
            >
              Add
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Overlay>
  );
}
