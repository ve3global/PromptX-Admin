import { Routes, Route } from "react-router-dom";
import Sider from "../src/components/Sider";
import HeaderComponent from "./components/Header";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            <>
              <Sider />
              <HeaderComponent />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
