// src\pages\Support.jsx
import { useState, useEffect } from "react";

export default function Support() {
  const [animate, setAnimate] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Time Logic
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Logic: Closed if it's after 6:30 PM (18:30) or before 8:00 AM
  const isClosed = hours > 18 || (hours === 18 && minutes >= 30) || hours < 8;

  useEffect(() => {
    setAnimate(true);
  }, []);

  const faqs = [
    {
      id: 1,
      q: "How do I repay my loan?",
      a: "Go to the Loans tab, select your active loan, and click 'Repay Now'. You can pay via M-Pesa or Card.",
    },
    {
      id: 2,
      q: "Why was my application rejected?",
      a: "Rejections are often due to low credit scores, incorrect ID details, or an existing overdue loan.",
    },
    {
      id: 3,
      q: "How do I increase my limit?",
      a: "Repay your loans on time. We review limits automatically after every successful repayment.",
    },
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 space-y-6">
      {/* 1. Header with Status Banner */}
      <div
        className={`
          bg-primary pt-8 pb-12 rounded-b-[2.5rem] shadow-xl relative overflow-hidden px-6
          transform transition-all duration-700 ease-out
          ${animate ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
        `}
      >
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">Help & Support</h1>
          <p className="text-slate-400 text-sm mb-6">We are here to help you</p>

          {/* Operational Status Pill */}
          <div
            className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md
                ${
                  isClosed
                    ? "bg-red-500/10 border-red-500/30 text-red-200"
                    : "bg-green-500/10 border-green-500/30 text-green-200"
                }
            `}
          >
            <span
              className={`flex h-2 w-2 rounded-full ${
                isClosed ? "bg-red-500" : "bg-green-400 animate-pulse"
              }`}
            ></span>
            <span className="text-xs font-semibold tracking-wide">
              {isClosed ? "Call Center Closed" : "Support Agents Online"}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Mon - Sun, 8:00 AM - 6:30 PM
          </p>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-6">
        {/* 2. Contact Channels Grid */}
        <div className="grid gap-3">
          {/* WhatsApp - Primary Channel */}
          <button
            className={`
                    group relative bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-green-200
                    transform ${
                      animate
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                `}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-primary">Chat on WhatsApp</h3>
              <p className="text-xs text-muted">Instant responses</p>
            </div>
            <svg
              className="w-5 h-5 text-slate-300"
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
          </button>

          {/* Email Support */}
          <button
            className={`
                    group relative bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-blue-200
                    transform ${
                      animate
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                `}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
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
            <div className="flex-1 text-left">
              <h3 className="font-bold text-primary">Send an Email</h3>
              <p className="text-xs text-muted">Get a reply in 24h</p>
            </div>
            <svg
              className="w-5 h-5 text-slate-300"
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
          </button>

          {/* Phone Call (Conditional) */}
          <button
            disabled={isClosed}
            className={`
                    group relative rounded-2xl p-4 flex items-center gap-4 transition-all duration-300
                    transform ${
                      animate
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                    ${
                      isClosed
                        ? "bg-slate-100 border border-slate-200 cursor-not-allowed opacity-70"
                        : "bg-gradient-to-r from-primary to-slate-800 text-white shadow-lg shadow-primary/20 hover:scale-[1.02]"
                    }
                `}
            style={{ transitionDelay: "300ms" }}
          >
            <div
              className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-colors
                    ${
                      isClosed
                        ? "bg-slate-200 text-slate-400"
                        : "bg-white/20 text-white"
                    }
                `}
            >
              <svg
                className="w-6 h-6"
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
            </div>
            <div className="flex-1 text-left">
              <h3
                className={`font-bold ${
                  isClosed ? "text-slate-500" : "text-white"
                }`}
              >
                Call Us Now
              </h3>
              <p
                className={`text-xs ${
                  isClosed ? "text-slate-400" : "text-slate-300"
                }`}
              >
                {isClosed ? "Currently Closed" : "+254 700 000 000"}
              </p>
            </div>
          </button>
        </div>

        {/* 3. FAQ Section */}
        <div
          className={`
                space-y-4 pt-4
                transform transition-all duration-700 delay-500 ease-out
                ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
            `}
        >
          <h2 className="text-lg font-bold text-primary pl-1">
            Frequently Asked
          </h2>

          <div className="space-y-3">
            {faqs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex justify-between items-center p-4 text-left"
                >
                  <span className="font-semibold text-sm text-primary">
                    {item.q}
                  </span>
                  <div
                    className={`
                                w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300
                                ${
                                  expandedFaq === item.id
                                    ? "rotate-180 bg-accent/20 text-accent"
                                    : "text-slate-400"
                                }
                            `}
                  >
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`
                                bg-slate-50 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out
                                ${
                                  expandedFaq === item.id
                                    ? "max-h-40 p-4 pt-0 border-t border-slate-100"
                                    : "max-h-0"
                                }
                            `}
                >
                  <div className="pt-2">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-xs text-slate-400 pt-8 pb-4">
          <p>App Version 1.0.2</p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="underline">Privacy Policy</span>
            <span className="underline">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
}
