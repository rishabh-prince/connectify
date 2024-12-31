import SidebarSkeleton from "./skeletons/SidebarSkeletons";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
  const {onlineUsers}=useAuthStore();

  const [showOnlineOnly,setShowOnlineOnly]=useState(false);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers=showOnlineOnly ? users.filter((user)=>onlineUsers.includes(user._id)) : users;
  if (isUserLoading) {
    return <SidebarSkeleton />;
  }
  return (
    <>
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium">Contacts</span>
        </div>
        <div className="mt-3 lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            className={`w-full sm:p-3 flex items-center gap-5 sm:gap-3 hover:bg-base-300 transition-colors
            ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : " "
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative lg:mx-0">
              <img
                src={user.profilePic || "./avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 rounded-full size-3 bg-green-500"></span>
              )}
            </div>
            <div className="text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "online" : "offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            No online users right now
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
