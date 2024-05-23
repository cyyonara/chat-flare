import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { IUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "@/hooks/custom/useDebounce";
import { useSearchUsers } from "@/hooks/api/useSearchUsers";
import { cn } from "@/lib/utils";
import Overlay from "@/components/common/Overlay";
import InputIcon from "@/components/common/InputIcon";
import UserResultSkeleton from "@/components/skeletons/UserResultSkeleton";
import UserSearchError from "@/components/error/UserSearchError";
import AddUserResult from "@/components/user/AddUserResult";
import SelectedUser from "@/components/user/SelectedUser";

interface IProps {
  closeModal: () => void;
}

export default function CreateGroupModal({ closeModal }: IProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const debounceValue = useDebounce(searchKeyword);
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    fetchNextPage,
    refetch,
  } = useSearchUsers(debounceValue);
  const { ref, inView } = useInView();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectedUsers = useCallback(
    (checked: boolean, user: IUser): void => {
      if (checked) {
        setSelectedUsers((prev) => [...prev, user]);
      } else {
        setSelectedUsers((prev) => prev.filter(({ _id }) => _id !== user._id));
      }
    },
    [],
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Overlay>
      <motion.div
        className="max-w-[450px] flex-1"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Create Group</CardTitle>
            <CardDescription>
              Start talking with multiple friends at the same time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-3">
              <Input
                type="text"
                placeholder="Enter group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <InputIcon
                type="text"
                placeholder="Search for a user to add..."
                ref={searchInputRef}
                icon={<Search size={20} />}
                iconPos="left"
                isIconClickable={false}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div
                className={cn(
                  "custom-scroll flex max-h-[200px] flex-wrap items-center gap-4 overflow-y-auto",
                  {
                    "p-2": selectedUsers.length > 0,
                  },
                )}
              >
                {selectedUsers.map((user) => (
                  <SelectedUser
                    key={user._id}
                    _id={user._id}
                    username={user.username}
                    email={user.email}
                    profilePicture={user.profilePicture}
                    handleSelectedUsers={handleSelectedUsers}
                  />
                ))}
              </div>
              <div className="custom-scroll flex max-h-[300px] flex-col gap-y-2 overflow-y-auto p-2 ">
                {isLoading && <UserResultSkeleton count={1} />}
                {isFetching && <UserResultSkeleton count={1} />}
                {isError && <UserSearchError retry={() => refetch()} />}
                {isSuccess && (
                  <React.Fragment>
                    {!data.pages[0].users.length ? (
                      <p className="text-center">No users found</p>
                    ) : (
                      data.pages.map((page) =>
                        page.users.map((user) => (
                          <AddUserResult
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
                  </React.Fragment>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-x-2">
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button disabled={groupName === "" || selectedUsers.length < 1}>
              Create
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Overlay>
  );
}
