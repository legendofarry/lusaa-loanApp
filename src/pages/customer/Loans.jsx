export default function Loans() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-bold">My Loans</h1>

      <div className="card space-y-1">
        <p className="font-semibold">KSH 30,000</p>
        <p className="text-sm text-muted">Status: Active</p>
        <p className="text-sm text-muted">Due: 30 Mar 2026</p>
      </div>

      <div className="card space-y-1">
        <p className="font-semibold">KSH 15,000</p>
        <p className="text-sm text-muted">
          Status: <span className="text-danger">Overdue</span>
        </p>
      </div>

      {/* Later: empty state + Firestore data */}
    </div>
  );
}
