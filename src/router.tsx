import { Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { RoutePath } from "./types/routes";

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<Login />} />
      <Route path={RoutePath.HOME} element={<Homepage />} />
    </Routes>
  );
};

export default Router;


 