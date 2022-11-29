import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import { RoutePath } from "./types/routes";

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.HOME} element={<Login />} />
    </Routes>
  );
};

export default Router;


 