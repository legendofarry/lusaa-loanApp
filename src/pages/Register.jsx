// src\pages\Register.jsx
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const saveUserToDb = async (user, additionalData = {}) => {
    // Check if user exists first to avoid overwriting existing data on social login
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: additionalData.name || user.displayName || "User",
        email: user.email,
        phone: additionalData.phone || user.phoneNumber || "",
        role: "customer",
        createdAt: Date.now(),
        authProvider: additionalData.provider || "email",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);

      await saveUserToDb(cred.user, { name, phone, provider: "email" });

      navigate("/verify-email");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = async (providerName) => {
    setError("");
    setLoading(true);

    let provider;
    if (providerName === "google") provider = new GoogleAuthProvider();
    if (providerName === "github") provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToDb(result.user, { provider: providerName });

      // Social logins are automatically verified
      navigate("/app/home");
    } catch (err) {
      console.error(err);
      setError(`Failed to register with ${providerName}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricsRegister = async () => {
    setError("");
    setLoading(true);

    try {
      if (!window.PublicKeyCredential) {
        throw new Error("Biometrics not supported on this device.");
      }

      // For registration, we create a credential
      const publicKey = {
        challenge: new Uint8Array(32),
        rp: { name: "Loan App", id: window.location.hostname },
        user: {
          id: new Uint8Array(16),
          name: email || "user@example.com",
          displayName: name || "New User",
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: { authenticatorAttachment: "platform" },
        timeout: 60000,
        attestation: "direct",
      };

      await navigator.credentials.create({ publicKey });

      // Note: Real registration requires backend verification of this credential
      setError(
        "Biometric credential created (Demo Only). Please use Email/Social to finish account setup."
      );
    } catch (err) {
      console.error(err);
      if (err.name === "NotAllowedError") {
        setError("Biometric setup canceled.");
      } else {
        setError("Biometric registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div
        className={`
          relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden
          transform transition-all duration-700 ease-out
          ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        <div className="px-8 pt-8 pb-6 text-center">
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Create Account
          </h1>
          <p className="mt-2 text-muted text-sm font-medium">
            Join us to manage your financial future
          </p>
        </div>

        <div className="px-8 pb-10">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="relative group">
              <input
                type="text"
                required
                className="block w-full pl-4 pr-3 py-3 border border-slate-200 rounded-xl text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 sm:text-sm bg-slate-50 focus:bg-white"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                required
                className="block w-full pl-4 pr-3 py-3 border border-slate-200 rounded-xl text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 sm:text-sm bg-slate-50 focus:bg-white"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="relative group">
              <input
                type="tel"
                required
                className="block w-full pl-4 pr-3 py-3 border border-slate-200 rounded-xl text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 sm:text-sm bg-slate-50 focus:bg-white"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <input
                type="password"
                required
                className="block w-full pl-4 pr-3 py-3 border border-slate-200 rounded-xl text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 sm:text-sm bg-slate-50 focus:bg-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-center text-sm text-danger animate-pulse bg-danger/10 p-2 rounded-lg border border-danger/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-primary to-slate-800 hover:to-slate-900 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted">Or sign up with</span>
            </div>
          </div>

          {/* Social & Biometric Actions */}
          <div className="grid grid-cols-1">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => handleSocialRegister("google")}
              disabled={loading}
              className="flex items-center justify-center py-2.5 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md"
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
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-accent hover:text-green-600 transition-colors duration-200 flex items-center justify-center w-full group"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
