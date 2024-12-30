import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-200 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <div
              className={`h-full w-full sm:w-72 border-r border-base-300 sm:flex flex-col transition-all duration-200 ${
                selectedUser ? "hidden" : "flex"
              }`}
            >
              <Sidebar />
            </div>

            {!selectedUser ? (
              <div className="min-w-0 hidden sm:flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
                <NoChatSelected />
              </div>
            ) : (
              <div className={`flex flex-1 flex-col overflow-auto`}>
                <ChatContainer />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
