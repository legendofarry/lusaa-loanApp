export default function Support() {
  const now = new Date();
  const callDisabled = now.getHours() >= 18 && now.getMinutes() >= 30;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-bold">Support</h1>

      <div className="card space-y-3">
        <button className="btn-secondary w-full">Email Support</button>

        <button className="btn-secondary w-full">WhatsApp Support</button>

        <button
          disabled={callDisabled}
          className={`w-full p-3 rounded ${
            callDisabled ? "bg-slate-700 text-muted" : "bg-accent text-black"
          }`}
        >
          Call Us
        </button>

        {callDisabled && (
          <p className="text-xs text-muted text-center">
            Calls available until 6:30 PM
          </p>
        )}
      </div>
    </div>
  );
}
