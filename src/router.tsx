import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RoomProvider } from "./context/RoomContext";
import { Auth } from "./helpers/Auth";
import Homepage from "./pages/Homepage/homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Room } from "./pages/Call/Room";
import { RoutePath } from "./types/routes";

const AuthenticatedRoutes = () => {
  const isAuthenticated = Auth.isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
};

const Router = () => {
  return (
    <RoomProvider>
      <Routes>
        <Route path={RoutePath.LOGIN} element={<Login />} />
        <Route path={RoutePath.REGISTER} element={<Register />} />

        {/* Add this routes inside the authenticatedRoutes after finish */}
        <Route path={RoutePath.HOME} element={<Homepage />} />
        <Route path={RoutePath.CALL} element={<Room />} />
        
        <Route path="/" element={<AuthenticatedRoutes />}></Route>
        
      </Routes>
    </RoomProvider>
  );
};

export default Router;
