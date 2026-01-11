// src\components\BottomNav.jsx
import { NavLink, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    {
      to: "/app/home",
      label: "Home",
      icon: (active) => (
        <svg
          className="w-6 h-6"
          fill={active ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2 : 1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      to: "/app/loans",
      label: "Loans",
      icon: (active) => (
        <svg
          className="w-6 h-6"
          fill={active ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2 : 1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      to: "/app/apply",
      label: "Apply",
      isFloating: true,
      icon: (active) => (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      to: "/app/support",
      label: "Support",
      icon: (active) => (
        <svg
          className="w-6 h-6"
          fill={active ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2 : 1.5}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      to: "/app/profile",
      label: "Profile",
      icon: (active) => (
        <svg
          className="w-6 h-6"
          fill={active ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2 : 1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Spacer to prevent content overlapping */}
      <div className="h-20 w-full bg-transparent pointer-events-none" />

      {/* Navigation Container */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2 relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;

            if (item.isFloating) {
              return (
                <div key={item.label} className="relative -top-6">
                  <NavLink
                    to={item.to}
                    className={`
                      flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-accent/40
                      transition-transform duration-300 hover:scale-105 active:scale-95
                      ${
                        isActive
                          ? "bg-primary border-4 border-white"
                          : "bg-accent border-4 border-white"
                      }
                    `}
                  >
                    {item.icon(isActive)}
                  </NavLink>
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) => `
                  flex flex-col items-center justify-center w-16 h-full space-y-1
                  transition-all duration-300
                  ${
                    isActive
                      ? "text-primary"
                      : "text-slate-400 hover:text-slate-600"
                  }
                `}
              >
                <div
                  className={`
                    relative transition-all duration-300 
                    ${isActive ? "transform -translate-y-1" : ""}
                `}
                >
                  {item.icon(isActive)}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isActive ? "text-primary font-bold" : ""
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
