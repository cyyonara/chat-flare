import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Chats from "@/components/chats/Chats";
import GroupChats from "@/components/chats/GroupChats";

interface IProps {}

export default function SidebarContent({}: IProps) {
  return (
    <div className="flex-1 py-5">
      <Tabs defaultValue="all-chats" className="w-full px-5">
        <TabsList className="w-full">
          <TabsTrigger value="all-chats" className="flex-1">
            All Chats
          </TabsTrigger>
          <TabsTrigger value="group-chats" className="flex-1">
            Group Chats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all-chats">
          <Chats />
        </TabsContent>
        <TabsContent value="group-chats">
          <GroupChats />
        </TabsContent>
      </Tabs>
    </div>
  );
}
