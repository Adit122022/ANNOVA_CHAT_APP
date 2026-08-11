import { ChevronLeft, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 px-4 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back button — only on mobile */}
          <button
            onClick={() => setSelectedUser(null)}
            className="lg:hidden btn btn-ghost btn-sm btn-circle"
            aria-label="Back to contacts"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full aspect-square relative">
              <img src={selectedUser.profilePic || "https://i.pinimg.com/736x/fb/03/7f/fb037f5804f567dd455aaa272b1e09f7.jpg"} alt={selectedUser.fullname} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium uppercase font-serif text-sm sm:text-base">{selectedUser.fullname}</h3>
            <p className={`text-xs sm:text-sm text-base-content/70  ${onlineUsers.includes(selectedUser._id) ? "text-green-400" : "text-red-400"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button — only on desktop */}
        <button onClick={() => setSelectedUser(null)} className="hidden lg:block">
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
