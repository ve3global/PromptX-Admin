import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Sider from "./components/Sider";
import Header from "./components/Header";
import SubscriptionPage from "./pages/SubscriptionPage";
import "./App.css";
import CreateSubscription from "./pages/createSubscription";

function App() {
  return (
    <Layout hasSider>
      <Sider />
      <Layout>
        <Header />
        <Routes>
          <Route path="/subscriptions" element={<SubscriptionPage />} />
          <Route path="/create" element={<CreateSubscription />} />
        </Routes>
      </Layout>
    </Layout>
  );
}

export default App;
