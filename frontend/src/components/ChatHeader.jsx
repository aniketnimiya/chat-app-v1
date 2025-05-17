import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;  

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 border-b border-base-300 flex items-center justify-between">
      {/* Left Side - User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar (✅ No online dot here) */}
        <div className="w-10 h-10">
          <img
            src={selectedUser.profilePic || "https://avatar.iran.liara.run/public/boy"}
            alt={selectedUser.fullName}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Name & Online Status (✅ Only this remains) */}
        <div>
          <h3 className="font-medium">{selectedUser.fullName}</h3>
          <p className="text-sm text-gray-500">
            {isOnline ? "🟢 Online" : "⚪ Offline"}
          </p>
        </div>
      </div>

      {/* Close Chat Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default ChatHeader;
