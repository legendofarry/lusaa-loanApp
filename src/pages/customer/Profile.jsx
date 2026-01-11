import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-bold">Profile</h1>

      <div className="card space-y-2">
        <p className="font-semibold">Account Details</p>
        <p className="text-sm text-muted">Email: user@email.com</p>
        <p className="text-sm text-muted">Phone: 07XXXXXXXX</p>
      </div>

      <div className="card space-y-2">
        <p className="font-semibold">Security</p>
        <button className="btn-secondary w-full">Change Password</button>
      </div>

      <button
        onClick={logout}
        className="bg-danger w-full p-3 rounded font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
