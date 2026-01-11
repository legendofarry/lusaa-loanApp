// src\pages\Profile.jsx
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    // Simulate fetching user data/animation delay
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        phone: currentUser.phoneNumber || "Not set",
        verified: currentUser.emailVerified,
        uid: currentUser.uid,
        memberSince: "Jan 2026", // Mock date
      });
    }
    setAnimate(true);
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Helper component for list items
  const ProfileItem = ({
    icon,
    label,
    value,
    action,
    isToggle,
    toggleState,
    setToggle,
  }) => (
    <div className="flex items-center justify-between p-4 bg-white border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{label}</p>
          {value && <p className="text-xs text-muted mt-0.5">{value}</p>}
        </div>
      </div>

      {isToggle ? (
        <button
          onClick={() => setToggle(!toggleState)}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
            toggleState ? "bg-accent" : "bg-slate-300"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
              toggleState ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      ) : (
        <div className="text-slate-300 group-hover:text-primary transition-colors">
          {action || (
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* 1. Header Section */}
      <div className="bg-primary pt-10 pb-20 px-6 rounded-b-[3rem] relative overflow-hidden shadow-xl">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-[-10%] w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div
          className={`flex flex-col items-center relative z-10 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden bg-slate-800">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-400">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent border-2 border-primary rounded-full flex items-center justify-center text-white shadow-lg">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          <h1 className="text-xl font-bold text-white tracking-wide">
            {user?.name}
          </h1>
          <p className="text-slate-400 text-sm mb-2">{user?.email}</p>

          {user?.verified ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-400 border border-green-500/30">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Verified Account
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-400 border border-yellow-500/30">
              Pending Verification
            </span>
          )}
        </div>
      </div>

      <div
        className={`px-6 -mt-12 space-y-6 transition-all duration-700 delay-100 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 2. Profile Completion Widget */}
        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="text-sm font-bold text-primary">
                Profile Completion
              </h3>
              <p className="text-xs text-muted">
                Complete to increase loan limit
              </p>
            </div>
            <span className="text-lg font-bold text-accent">80%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-accent h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
          </div>
        </div>

        {/* 3. Account Settings Group */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider">
              Personal Info
            </h4>
          </div>
          <ProfileItem
            icon={
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            }
            label="Phone Number"
            value={user?.phone}
          />
          <ProfileItem
            icon={
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            label="Address"
            value="Nairobi, Westlands"
          />
          <ProfileItem
            icon={
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
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .883-.393 1.627-1.08 2.164"
                />
              </svg>
            }
            label="ID Document"
            value="Verified"
            action={
              <span className="text-accent text-xs font-bold bg-accent/10 px-2 py-1 rounded">
                VIEW
              </span>
            }
          />
        </div>

        {/* 4. App Preferences */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider">
              Security & App
            </h4>
          </div>
          <ProfileItem
            icon={
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            }
            label="Biometric Login"
            value="Use FaceID / TouchID"
            isToggle={true}
            toggleState={biometricsEnabled}
            setToggle={setBiometricsEnabled}
          />
          <ProfileItem
            icon={
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            }
            label="Notifications"
            value="Push alerts for loans"
            isToggle={true}
            toggleState={notificationsEnabled}
            setToggle={setNotificationsEnabled}
          />
          <ProfileItem
            icon={
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
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 8m0 0a8 8 0 00-8 8c0 2.472.345 4.865.99 7.131M10 11a2 2 0 114 0 2 2 0 01-4 0z"
                />
              </svg>
            }
            label="Change Password"
            value="Last updated 3 months ago"
          />
        </div>

        {/* 5. Logout */}
        <button
          onClick={logout}
          className="w-full bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors active:scale-95"
        >
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>

        <p className="text-center text-xs text-slate-300 pb-4">
          Member since {user?.memberSince}
        </p>
      </div>
    </div>
  );
}
