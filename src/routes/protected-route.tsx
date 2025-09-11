import { ROUTES } from "@lib/constants/routes";
import { FC, PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProps extends PropsWithChildren {}

const ProtectedRoute: FC<IProps> = () => {
  const isAuth = true; //JSON.parse(localStorage.getItem("@auth") || "{}")?.isAuth;

  console.log("@auth", isAuth);

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.auth} />;
};

export default ProtectedRoute;
