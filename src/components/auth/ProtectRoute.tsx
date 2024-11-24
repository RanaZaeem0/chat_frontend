import { Navigate, Outlet } from "react-router-dom";

interface ProtectRouteProps {
  children?: React.ReactNode;
  redirect?: string;
  user: any; // Replace `any` with your actual user type
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children, redirect = "/login", user }) => {
  // Avoid re-rendering unnecessarily by ensuring stable conditions
  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  // Render children or an Outlet if no children
  return children ? <>{children}</> : <Outlet />;
};

export { ProtectRoute };
