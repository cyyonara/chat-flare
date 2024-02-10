import React from "react";
import Overlay from "@/components/Overlay";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreateChatTabItem from "@/components/CreateChatTabItem";

interface IProps {
  closeModal: () => void;
}

const AddChatModal: React.FC<IProps> = () => {
  return (
    <Overlay>
      <div className="max-w-[450px] flex-1">
        <Card className="p-4">
          <Tabs defaultValue="create-chat">
            <TabsList className="w-full">
              <TabsTrigger value="create-chat" className="flex-1">
                New Chat
              </TabsTrigger>
              <TabsTrigger value="create-group" className="flex-1">
                Create Group
              </TabsTrigger>
            </TabsList>
            <TabsContent value="create-chat">
              <CreateChatTabItem />
            </TabsContent>
            <TabsContent value="create-group">group</TabsContent>
          </Tabs>
        </Card>
      </div>
    </Overlay>
  );
};

export default AddChatModal;
