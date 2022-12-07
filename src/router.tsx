import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage";
import Call from "./pages/Call/call";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { RoutePath } from "./types/routes";
import { Auth } from "./helpers/Auth";

const AuthenticatedRoutes = () => {
  const isAuthenticated = Auth.isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
};

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<Login />} />
      <Route path={RoutePath.REGISTER} element={<Register />} />
      <Route path="/" element={<AuthenticatedRoutes />}>
        <Route path={RoutePath.HOME} element={<Homepage />} />
        <Route path={RoutePath.CALL} element={<Call />} />
      </Route>
    </Routes>
  );
};

export default Router;
