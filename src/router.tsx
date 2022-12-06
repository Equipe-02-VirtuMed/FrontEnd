import { Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage/homepage";
import Call from "./pages/Call/call";
import Login from "./pages/Login";
import { RoutePath } from "./types/routes";

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<Login />} />
      <Route path={RoutePath.HOME} element={<Homepage />} />
      <Route path={RoutePath.CALL} element={<Call />} />
    </Routes>
  );
};

export default Router;


 