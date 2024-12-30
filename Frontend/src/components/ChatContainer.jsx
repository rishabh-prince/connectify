import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formateMessageTime } from "../lib/utils";
import { X } from "lucide-react";
const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages } =useChatStore();
  const { authUser } = useAuthStore();
  const [isImageSelected,setIsImageSelected]=useState(null);
  
  const messageEndRef=useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return ()=>unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages,unsubscribeFromMessages]);

  useEffect(()=>{
    if(messageEndRef.current)
    messageEndRef.current.scrollIntoView({behavior : "smooth"})
  },[messages])

  if (isMessagesLoading)
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  return (
    <>
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
        {isImageSelected ? (
          <div
            className={`${isImageSelected ? "flex" : "hidden"} flex-col gap-2 sm:w-2/3 sm:h-2/3 h-full min-w-80 m-auto`}
          >
            <div
              className="size-4 cursor-pointer"
              onClick={() => setIsImageSelected(null)}
            >
              <X />
            </div>
            <img
              src={isImageSelected}
              alt="attachment"
              className="w-full rounded-md mb-2"
            />
          </div>
        ) : (
          messages?.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="Profile Pic"
                  />
                </div>
              </div>
              <div className="chat-bubble flex flex-col gap-2">
                {message.image && (
                  <>
                    <img
                      src={message.image}
                      alt="attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                      onClick={() => setIsImageSelected(message.image)}
                    />
                  </>
                )}
                {message.text && <p>{message.text}</p>}
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formateMessageTime(message.createdAt)}
                </time>
              </div>
              <div ref={messageEndRef}></div>
            </div>
          ))
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
