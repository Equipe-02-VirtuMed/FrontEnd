import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage";
import Call from "./pages/Call/call2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { RoutePath } from "./types/routes";
import { Auth } from "./helpers/Auth";
import EditUser from "./pages/User";


const AuthenticatedRoutes = () => {
  const isAuthenticated = Auth.isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
};

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<Login />} />
      <Route path={RoutePath.REGISTER} element={<Register />} />


      {/* Add this routes inside the authenticatedRoutes after finish */}
      <Route path={RoutePath.HOME} element={<Homepage />} />
      <Route path={RoutePath.CALL} element={<Call />} />
      <Route path={RoutePath.USER} element={<EditUser />} />


      <Route path="/" element={<AuthenticatedRoutes />}>

      </Route>
    </Routes>
  );
};

export default Router;
