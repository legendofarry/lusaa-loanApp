export default function Home() {
  /**
   * In the future, this screen will be driven by:
   * - trustScore
   * - accountStatus
   * - activeLoan
   * - systemPaused
   *
   * For now, we show a clean placeholder state.
   */

  const status = "UNDER_REVIEW";
  // Possible later values:
  // NO_LIMIT | ELIGIBLE | PENDING | APPROVED | ACTIVE_LOAN | OVERDUE | SYSTEM_PAUSED

  return (
    <div className="p-6 space-y-6">
      {/* Status Card */}
      <div className="card text-center space-y-2">
        <p className="text-xs uppercase text-muted">Account Status</p>

        {status === "UNDER_REVIEW" && (
          <>
            <p className="text-lg font-semibold">Under Review</p>
            <p className="text-sm text-muted">
              Your account is being reviewed. You will be notified once
              eligible.
            </p>
          </>
        )}

        {status === "ELIGIBLE" && (
          <>
            <p className="text-lg font-semibold text-accent">
              Eligible for Loan
            </p>
            <p className="text-sm text-muted">
              You can apply for a loan within your limit.
            </p>
          </>
        )}

        {status === "SYSTEM_PAUSED" && (
          <>
            <p className="text-lg font-semibold text-danger">
              Loans Temporarily Unavailable
            </p>
            <p className="text-sm text-muted">Please check again later.</p>
          </>
        )}
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <p className="text-xs text-muted">Loan Limit</p>
          <p className="text-lg font-bold">KSH 0</p>
        </div>

        <div className="card">
          <p className="text-xs text-muted">Trust Level</p>
          <p className="text-lg font-bold">New</p>
        </div>
      </div>

      {/* Guidance */}
      <div className="card">
        <p className="font-semibold mb-1">Important</p>
        <p className="text-sm text-muted">
          Loans are approved manually. Providing false information may lead to
          permanent denial.
        </p>
      </div>
    </div>
  );
}
