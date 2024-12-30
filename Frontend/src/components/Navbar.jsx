import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import { LogIn, LogOut, MessageSquare, Settings, User } from "lucide-react";


const Navbar = () => {
  const {authUser,logout} = useAuthStore();
  return (
    <div className="bg-base-100 border-b border-base-300 fixed w-full top-0 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="w-9 h-9 size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="text-lg font-bold">Connectify</div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors rounded-lg">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser ? (
              <>
                <Link to="/profile" className="btn btn-sm gap-2 rounded-lg">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  className="flex gap-2 items-center rounded-lg btn btn-sm"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm gap-2 rounded-lg">
                <LogIn className="size-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar