import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ShoppingBag, Megaphone, User } from "lucide-react";
import { cn } from "../lib/utils";

/** Base App Wrapper containing the mobile constraint */
export function AppWrapper() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center font-sans relative overflow-hidden">
      <div className="w-full max-w-[390px] h-full sm:h-[844px] bg-brand-bg text-white relative overflow-hidden sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 shadow-2xl flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

/** Standard screen layout with scrolling content */
export function FlowLayout({ title, rightContent, children }: { title?: React.ReactNode, rightContent?: React.ReactNode, children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full bg-brand-bg">
      { title && (
        <header className="flex items-center justify-between px-4 py-4 shrink-0 bg-brand-bg relative z-10 border-b border-brand-border">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-brand-card">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">{title}</h1>
          <div className="w-10 flex justify-end">
            {rightContent}
          </div>
        </header>
      )}
      <main className="flex-1 overflow-y-auto w-full relative">
        {children}
      </main>
    </div>
  );
}

/** Main app layout with bottom navigation */
export function MainLayout() {
  return (
    <div className="flex flex-col h-full bg-brand-bg relative pb-[80px]">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
}

export function BottomNavBar() {
  const nav = [
    { label: "Home", path: "/home", icon: Home },
    { label: "Orders", path: "/orders", icon: ShoppingBag },
    { label: "Ads", path: "/p2p", icon: Megaphone },
    { label: "Profile", path: "/settings", icon: User },
  ];
  const { pathname } = useLocation();

  return (
    <div className="absolute bottom-0 left-0 w-full h-[80px] bg-[#0d0d0d] border-t border-brand-border flex items-center justify-around px-2 z-50">
      {nav.map((item) => {
        const isActive = pathname.startsWith(item.path);
        const Icon = item.icon;
        return (
          <Link key={item.path} to={item.path} className="flex flex-col items-center justify-center p-2 gap-1 relative w-16">
            <Icon className={cn("w-6 h-6", isActive ? "text-brand-primary" : "text-gray-500")} strokeWidth={isActive ? 2.5 : 2} />
            <span className={cn("text-[10px] font-medium", isActive ? "text-brand-primary" : "text-gray-500")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
