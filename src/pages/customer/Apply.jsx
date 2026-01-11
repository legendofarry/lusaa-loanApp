// src\pages\Apply.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Apply() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  // Form State
  const [amount, setAmount] = useState(5000);
  const [duration, setDuration] = useState(30);
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  // Constants
  const LOAN_LIMIT = 50000;
  const INTEREST_RATE = 0.12; // 12%
  const PROCESSING_FEE_RATE = 0.03; // 3%

  // Mount Animation
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Real-time Calculations
  const interest = Math.round(amount * INTEREST_RATE * (duration / 30));
  const processingFee = Math.round(amount * PROCESSING_FEE_RATE);
  const totalRepayment = parseInt(amount) + interest + processingFee;

  // Haptic Feedback Helper
  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
    triggerHaptic();
  };

  const handleDurationChange = (d) => {
    setDuration(d);
    triggerHaptic();
  };

  const purposes = [
    { id: "business", label: "Business", icon: "💼" },
    { id: "emergency", label: "Emergency", icon: "🚨" },
    { id: "personal", label: "Personal", icon: "🏠" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "travel", label: "Travel", icon: "✈️" },
  ];

  const handleSubmit = () => {
    if (!purpose) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/app/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 relative overflow-x-hidden">
      {/* 1. Modern Header with Limit Ring */}
      <div className="bg-primary pt-8 pb-12 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div
          className={`relative z-10 text-center space-y-4 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h1 className="text-white font-bold text-lg tracking-wide opacity-90">
            Loan Application
          </h1>

          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              {/* SVG Progress Ring */}
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="#1e293b"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="#22C55E"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={365}
                  strokeDashoffset={365 - 365 * (amount / LOAN_LIMIT)}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  Limit
                </span>
                <span className="text-xl font-bold">
                  KSH {LOAN_LIMIT / 1000}k
                </span>
              </div>
            </div>
            <p className="text-xs text-accent mt-2 font-medium bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              Available to Borrow
            </p>
          </div>
        </div>
      </div>

      <div
        className={`px-5 -mt-8 space-y-6 transition-all duration-700 delay-100 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 2. Calculator Card */}
        <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 p-6 space-y-6 border border-slate-100">
          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">
                Amount
              </label>
              <div className="text-primary font-bold text-2xl">
                <span className="text-sm align-top mr-1">KSH</span>
                {amount.toLocaleString()}
              </div>
            </div>
            <input
              type="range"
              min="500"
              max={LOAN_LIMIT}
              step="500"
              value={amount}
              onChange={handleAmountChange}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent hover:accent-green-600 focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* Duration Input */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">
                Duration
              </label>
              <span className="text-xs font-bold bg-slate-100 text-primary px-2 py-1 rounded-md">
                {duration} Days
              </span>
            </div>
            <div className="flex justify-between gap-2">
              {[7, 14, 21, 30].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDurationChange(d)}
                  className={`
                                flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-200 border
                                ${
                                  duration === d
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 transform scale-105"
                                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                                }
                            `}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          {/* Purpose Input (Horizontal Scroll) */}
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-3">
              Purpose
            </label>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
              {purposes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPurpose(p.id)}
                  className={`
                                flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl border transition-all duration-200
                                ${
                                  purpose === p.id
                                    ? "border-accent bg-accent/5 text-accent ring-1 ring-accent"
                                    : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100"
                                }
                            `}
                >
                  <span className="text-2xl mb-1 filter drop-shadow-sm">
                    {p.icon}
                  </span>
                  <span className="text-[10px] font-bold">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Live Receipt */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-500 rounded-2xl opacity-20 blur transition duration-200 group-hover:opacity-40"></div>
          <div className="relative bg-white rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3 mb-3">
              <span className="text-sm font-semibold text-primary">
                Repayment Summary
              </span>
              <span className="text-xs text-muted bg-slate-100 px-2 py-1 rounded">
                Due in {duration} days
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Principal</span>
                <span>{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Interest & Fees</span>
                <span>+ {(interest + processingFee).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg text-primary pt-1">
                <span>Total Due</span>
                <span>KSH {totalRepayment.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Action Button (Inside flow, visible above BottomNav) */}
        <button
          onClick={handleSubmit}
          disabled={!purpose || loading}
          className={`
                w-full py-4 rounded-xl font-bold text-white shadow-xl flex items-center justify-center space-x-2
                transition-all duration-300 transform active:scale-95
                ${
                  !purpose || loading
                    ? "bg-slate-300 cursor-not-allowed shadow-none"
                    : "bg-gradient-to-r from-primary to-slate-800 hover:shadow-2xl hover:shadow-primary/20"
                }
            `}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing
            </span>
          ) : (
            <span>Submit Application</span>
          )}
        </button>
      </div>
    </div>
  );
}
