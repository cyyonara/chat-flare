import { useMessages } from "@/hooks/api/useMessages";
import Message from "@/components/chats/Message";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

interface IProps {
  isFetchingChatSuccess: boolean;
}

export default function MessagesContainer({ isFetchingChatSuccess }: IProps) {
  const { data, isLoading, isSuccess, isFetching, fetchNextPage } = useMessages(
    isFetchingChatSuccess,
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, isSuccess, isFetching, isLoading]);

  return (
    <div className="custom-scroll flex flex-1 flex-col-reverse justify-start gap-y-3 overflow-y-auto p-6">
      {isSuccess && (
        <>
          {data.pages.map((page, pageIndex) =>
            page.messages.map((message, messageIndex) => (
              <Message
                key={message.statusId}
                {...message}
                pageIndex={pageIndex}
                messageIndex={messageIndex}
                pages={data.pages}
                totalPages={page.totalPages}
              />
            )),
          )}
          <div ref={ref}></div>
        </>
      )}
      {isFetching && (
        <div className="flex justify-center">
          <Loader2 size={25} className="animate-spin text-secondary" />
        </div>
      )}
    </div>
  );
}
