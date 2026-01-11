// src\pages\Loans.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loans() {
  const [activeTab, setActiveTab] = useState("active"); // 'active' | 'history'
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Mock Data (Replace with Firestore data later)
  const loans = [
    {
      id: "LN-8832",
      amount: 30000,
      balance: 12500,
      status: "ACTIVE", // ACTIVE, OVERDUE, PAID
      dueDate: "30 Mar 2026",
      issuedDate: "01 Mar 2026",
      type: "Personal Loan",
    },
    {
      id: "LN-4421",
      amount: 15000,
      balance: 15000,
      status: "OVERDUE",
      dueDate: "15 Feb 2026",
      issuedDate: "15 Jan 2026",
      type: "Emergency Loan",
    },
    {
      id: "LN-1029",
      amount: 5000,
      balance: 0,
      status: "PAID",
      dueDate: "10 Dec 2025",
      issuedDate: "01 Dec 2025",
      type: "Airtime Advance",
    },
  ];

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Filter loans based on tab
  const filteredLoans = loans.filter((loan) => {
    if (activeTab === "active")
      return loan.status === "ACTIVE" || loan.status === "OVERDUE";
    if (activeTab === "history") return loan.status === "PAID";
    return true;
  });

  // Helper for Status Styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "OVERDUE":
        return "bg-red-100 text-red-700 border-red-200 animate-pulse";
      case "PAID":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pb-24 space-y-6">
      {/* 1. Header & Actions */}
      <div
        className={`
          flex justify-between items-end
          transform transition-all duration-700 ease-out
          ${animate ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
        `}
      >
        <div>
          <h1 className="text-2xl font-bold text-primary">My Loans</h1>
          <p className="text-sm text-muted">Manage your repayment schedule</p>
        </div>

        <button className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-primary hover:bg-slate-50 transition-colors">
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>
      </div>

      {/* 2. Custom Tabs */}
      <div
        className={`
          bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex
          transform transition-all duration-700 delay-100 ease-out
          ${animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
        `}
      >
        <button
          onClick={() => setActiveTab("active")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
            activeTab === "active"
              ? "bg-primary text-white shadow-md"
              : "text-muted hover:bg-slate-50"
          }`}
        >
          Active Loans
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
            activeTab === "history"
              ? "bg-primary text-white shadow-md"
              : "text-muted hover:bg-slate-50"
          }`}
        >
          History
        </button>
      </div>

      {/* 3. Loan Cards List */}
      <div className="space-y-4">
        {filteredLoans.length > 0 ? (
          filteredLoans.map((loan, index) => (
            <div
              key={loan.id}
              className={`
                group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300
                transform ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
              `}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      loan.status === "OVERDUE"
                        ? "bg-red-50 text-red-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm">
                      {loan.type}
                    </h3>
                    <p className="text-xs text-muted">ID: {loan.id}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(
                    loan.status
                  )}`}
                >
                  {loan.status}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs text-muted uppercase tracking-wider font-semibold">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-primary">
                  KSH {loan.amount.toLocaleString()}
                </span>
              </div>

              {/* Progress Bar (Only for active/overdue) */}
              {loan.status !== "PAID" && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">
                      Paid:{" "}
                      <span className="text-accent font-semibold">
                        KSH {(loan.amount - loan.balance).toLocaleString()}
                      </span>
                    </span>
                    <span className="text-slate-500">
                      Balance:{" "}
                      <span className="text-danger font-semibold">
                        KSH {loan.balance.toLocaleString()}
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        loan.status === "OVERDUE" ? "bg-red-500" : "bg-accent"
                      }`}
                      style={{
                        width: `${
                          ((loan.amount - loan.balance) / loan.amount) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Due Date</p>
                  <p className="text-sm font-semibold text-primary">
                    {loan.dueDate}
                  </p>
                </div>

                {loan.status !== "PAID" ? (
                  <button
                    className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
                    onClick={() => console.log(`Repay ${loan.id}`)}
                  >
                    Repay Now
                  </button>
                ) : (
                  <div className="flex items-center text-green-600 text-xs font-bold">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Completed
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fadeIn">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-10 h-10 text-slate-300"
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
            </div>
            <h3 className="text-lg font-bold text-primary">
              No {activeTab} loans
            </h3>
            <p className="text-sm text-muted max-w-xs mx-auto">
              {activeTab === "active"
                ? "You don't have any active loans at the moment. You are debt free!"
                : "You haven't completed any loans yet."}
            </p>
            {activeTab === "active" && (
              <button
                onClick={() => navigate("/app/home")}
                className="mt-4 text-accent font-bold text-sm hover:underline"
              >
                Apply for a new loan
              </button>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button (Optional for Mobile) */}
      <div className="fixed bottom-24 right-6 md:hidden">
        <button className="w-14 h-14 bg-accent text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform active:scale-90">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
