import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <>
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

       
        <h2 className="text-2xl font-bold">Welcome to Connectify!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </>
  );
};

export default NoChatSelected;
