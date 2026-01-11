// src\pages\VerifyEmail.jsx
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const check = async () => {
    await auth.currentUser.reload();
    if (auth.currentUser.emailVerified) {
      navigate("/onboarding");
    }
  };

  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-xl font-bold">Verify Your Email</h1>
      <p>Please verify your email to continue.</p>
      <button onClick={check} className="btn-primary">
        I Have Verified
      </button>
    </div>
  );
}
