export default function Apply() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-bold">Apply for Loan</h1>

      <div className="card space-y-3">
        <div>
          <p className="text-xs text-muted">Your Loan Limit</p>
          <p className="text-lg font-bold">KSH 50,000</p>
        </div>

        <input type="number" placeholder="Amount" className="input" />

        <input type="number" placeholder="Duration (days)" className="input" />

        <select className="input">
          <option>Purpose of loan</option>
          <option>Business</option>
          <option>Emergency</option>
          <option>Personal</option>
        </select>

        <div className="text-xs text-muted">
          Interest and penalties will be shown before approval.
        </div>

        <button className="btn-primary">Submit Application</button>
      </div>
    </div>
  );
}
