import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from '../utils/utils';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages , unsubscribeFromMessages ,subscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
    // Set current date from the first message if messages exist
    if (messages && messages.length > 0) {
      const firstMessageDate = formatMessageTime(messages[0].createdAt).date;
      setCurrentDate(firstMessageDate);
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Centered date container */}
        <div className="flex justify-center w-full my-2">
          <div className="px-4 py-1 bg-gray-600/50 text-white rounded-full">
            <span>{currentDate}</span>
          </div>
        </div>
        
        {messages.map((message) => {
          const formattedTime = formatMessageTime(message.createdAt);
          
          return (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={message === messages[messages.length - 1] ? messageEndRef : null}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="w-10 h-10 sm:w-12 sm:h-12"  // Responsive image size
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <div className="opacity-50 text-xs">
                  <time>{formattedTime.time}</time>
                </div>
              </div>

              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p className="break-words">{message.text}</p>}  {/* Prevent text overflow */}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
