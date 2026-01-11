// src\pages\Login.jsx
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Simple mount animation trigger
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Standard Email/Password Login
  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!cred.user.emailVerified) {
        navigate("/verify-email");
        return;
      }
      navigate("/app/home");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Social Login Handler (Google/GitHub)
  const handleSocialLogin = async (providerName) => {
    setError("");
    setLoading(true);

    let provider;
    if (providerName === "google") provider = new GoogleAuthProvider();
    if (providerName === "github") provider = new GithubAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/app/home");
    } catch (err) {
      console.error(err);
      setError(`Failed to sign in with ${providerName}`);
    } finally {
      setLoading(false);
    }
  };

  // Device Biometrics / Passkey Handler
  const handleBiometrics = async () => {
    setError("");
    setLoading(true);

    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error("Biometrics not supported on this device.");
      }

      // This options object triggers the device's native FaceID/TouchID/Hello prompt.
      // In a production app, the 'challenge' must come from your backend.
      const publicKey = {
        challenge: new Uint8Array(32), // Dummy challenge to trigger UI
        rpId: window.location.hostname,
        userVerification: "required",
        timeout: 60000,
      };

      // This line opens the browser/OS native modal
      await navigator.credentials.get({ publicKey });

      // If successful (and backend verifies it), redirect
      navigate("/app/home");
    } catch (err) {
      console.error(err);
      // Friendly error if user cancels or device doesn't support it
      if (err.name === "NotAllowedError") {
        setError("Biometric request canceled or timed out.");
      } else {
        setError("Biometric login failed or not configured.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor (Subtle Gradients) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Main Card */}
      <div
        className={`
          relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden
          transform transition-all duration-700 ease-out
          ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        {/* Header Section */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4 text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-muted text-sm font-medium">
            Enter your credentials or use biometrics
          </p>
        </div>

        {/* Form Section */}
        <div className="px-8 pb-10">
          <form onSubmit={login} className="space-y-5">
            {/* Email Input */}
            <div className="group space-y-1">
              <label className="text-xs font-semibold text-primary/70 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-muted group-focus-within:text-accent transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 sm:text-sm bg-slate-50 focus:bg-white"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group space-y-1">
              <label className="text-xs font-semibold text-primary/70 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-muted group-focus-within:text-accent transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
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
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 sm:text-sm bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 text-sm text-danger bg-danger/10 rounded-lg border border-danger/20 animate-pulse">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white 
                bg-gradient-to-r from-primary to-slate-800 hover:to-slate-900
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {loading ? "Processing..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted">Or continue with</span>
            </div>
          </div>

          {/* Social & Biometric Actions */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              className="flex items-center justify-center py-2.5 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md"
              title="Sign in with Google"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>

            {/* Biometrics Button */}
            <button
              type="button"
              onClick={handleBiometrics}
              disabled={loading}
              className="group flex items-center justify-center py-2.5 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md relative overflow-hidden"
              title="Sign in with Passkey / Biometrics"
            >
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <svg
                className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 8m0 0a8 8 0 00-8 8c0 2.472.345 4.865.99 7.131M10 11a2 2 0 114 0 2 2 0 01-4 0z"
                />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center space-y-4">
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-semibold text-accent hover:text-green-600 transition-colors duration-200 flex items-center justify-center w-full group"
            >
              Create an account
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            <p className="text-xs text-muted/60 mt-4">
              Secure, verified access only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
