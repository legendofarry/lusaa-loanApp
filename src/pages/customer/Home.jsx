// src\pages\Home.jsx
import { useState, useEffect } from "react";

export default function Home() {
  const [animate, setAnimate] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  /**
   * In the future, this screen will be driven by:
   * - trustScore
   * - accountStatus
   * - activeLoan
   * - systemPaused
   */
  const status = "UNDER_REVIEW";
  // Possible later values:
  // NO_LIMIT | ELIGIBLE | PENDING | APPROVED | ACTIVE_LOAN | OVERDUE | SYSTEM_PAUSED

  // UI Configuration based on status
  const getStatusUI = () => {
    switch (status) {
      case "ELIGIBLE":
        return {
          bg: "bg-gradient-to-br from-green-500 to-emerald-700",
          icon: (
            <svg
              className="w-12 h-12 text-white/90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          title: "You are Eligible",
          desc: "Great news! You can now apply for a loan within your assigned limit.",
          badge: "Active",
          badgeColor: "bg-white/20 text-white",
        };
      case "SYSTEM_PAUSED":
        return {
          bg: "bg-gradient-to-br from-red-500 to-rose-700",
          icon: (
            <svg
              className="w-12 h-12 text-white/90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ),
          title: "Service Unavailable",
          desc: "Loans are temporarily paused for maintenance. Please check back later.",
          badge: "Paused",
          badgeColor: "bg-white/20 text-white",
        };
      case "UNDER_REVIEW":
      default:
        return {
          bg: "bg-gradient-to-br from-primary to-slate-800",
          icon: (
            <div className="relative">
              <svg
                className="w-12 h-12 text-white/90 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-primary animate-ping"></div>
            </div>
          ),
          title: "Under Review",
          desc: "We are currently analyzing your profile. You will be notified once eligible.",
          badge: "Pending",
          badgeColor: "bg-yellow-400/20 text-yellow-200",
        };
    }
  };

  const uiConfig = getStatusUI();

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6 pb-24">
      {/* 1. Header Section */}
      <div
        className={`
          flex justify-between items-center transform transition-all duration-700 ease-out
          ${animate ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
        `}
      >
        <div>
          <p className="text-sm text-muted font-medium">Overview</p>
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        </div>
        <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
      </div>

      {/* 2. Hero / Status Card */}
      <div
        className={`
          relative w-full rounded-3xl p-6 shadow-xl overflow-hidden ${
            uiConfig.bg
          } text-white
          transform transition-all duration-700 delay-100 ease-out
          ${
            animate
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }
        `}
      >
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-4 py-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 shadow-inner">
            {uiConfig.icon}
          </div>

          <div className="space-y-1">
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${uiConfig.badgeColor} mb-2`}
            >
              {uiConfig.badge}
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {uiConfig.title}
            </h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-xs mx-auto">
              {uiConfig.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Loan Limit Card */}
        <div
          className={`
            bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3
            transform transition-all duration-700 delay-200 ease-out
            ${
              animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }
          `}
        >
          <div className="flex items-start justify-between">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">
              Loan Limit
            </p>
            <p className="text-xl font-bold text-primary mt-1">KSH 0</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[5%] rounded-full"></div>
          </div>
        </div>

        {/* Trust Level Card */}
        <div
          className={`
            bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3
            transform transition-all duration-700 delay-300 ease-out
            ${
              animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }
          `}
        >
          <div className="flex items-start justify-between">
            <div className="w-8 h-8 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">
              Trust Level
            </p>
            <p className="text-xl font-bold text-primary mt-1">New</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-accent h-full w-[20%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 4. Guidance / Notification */}
      <div
        className={`
          bg-white p-5 rounded-2xl shadow-lg shadow-slate-200/50 border-l-4 border-accent flex gap-4
          transform transition-all duration-700 delay-500 ease-out
          ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary mb-1">
            Important Notice
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            Loans are approved manually by our team. Providing false or
            inaccurate information may lead to permanent denial of services.
          </p>
        </div>
      </div>
    </div>
  );
}
