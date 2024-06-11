import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/custom/useDebounce";
import React, { useState, useEffect, useRef } from "react";
import { useSearchUsers } from "@/hooks/api/useSearchUsers";
import { useInView } from "react-intersection-observer";
import InputIcon from "@/components/common/InputIcon";
import UserResult from "@/components/user/UserResult";
import Overlay from "@/components/common/Overlay";
import UserResultSkeleton from "@/components/skeletons/UserResultSkeleton";
import UserSearchError from "@/components/error/UserSearchError";

interface IProps {
   closeModal: () => void;
}

export default function SearchUserModal({ closeModal }: IProps) {
   const [searchKeyword, setSearchKeyword] = useState<string>("");
   const debounceValue = useDebounce(searchKeyword);
   const {
      data,
      isLoading,
      isFetching,
      isSuccess,
      isError,
      fetchNextPage,
      refetch,
   } = useSearchUsers(debounceValue);
   const { inView, ref } = useInView();
   const searchInputRef = useRef<HTMLInputElement | null>(null);

   useEffect(() => {
      searchInputRef.current?.focus();
   }, []);

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
                  <CardTitle>Search a user</CardTitle>
                  <CardDescription>
                     Start talking with your friends
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex flex-col gap-y-4">
                     <InputIcon
                        type="text"
                        placeholder="Enter email or username..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        icon={<Search color="grey" size={20} />}
                        iconPos="left"
                        ref={searchInputRef}
                     />
                     <div className="custom-scroll flex max-h-[300px] flex-col gap-y-2 overflow-y-auto p-2">
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
                                       <UserResult
                                          key={user._id}
                                          _id={user._id}
                                          username={user.username}
                                          email={user.email}
                                          profilePicture={user.profilePicture}
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
               <CardFooter>
                  <Button
                     variant="secondary"
                     className="ml-auto"
                     onClick={closeModal}
                  >
                     Close
                  </Button>
               </CardFooter>
            </Card>
         </motion.div>
      </Overlay>
   );
}
