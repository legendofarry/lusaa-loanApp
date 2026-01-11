import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="h-16 bg-primary flex justify-around items-center">
      <NavLink to="/app/home">Home</NavLink>
      <NavLink to="/app/loans">Loans</NavLink>
      <NavLink to="/app/apply" className="text-accent font-bold">
        Apply
      </NavLink>
      <NavLink to="/app/support">Support</NavLink>
      <NavLink to="/app/profile">Profile</NavLink>
    </div>
  );
}
