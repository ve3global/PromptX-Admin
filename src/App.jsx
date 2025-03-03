import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Sider from "./components/Sider";
import Header from "./components/Header";
import SubscriptionPage from "./pages/SubscriptionPage";
import "./App.css";
import CreateSubscription from "./pages/CreateSubscription";
import EditSubscription from "./pages/EditSubscription";
import FeatureGetting from "./pages/FeatureGetting";
import EditFeature from "./pages/EditFeature";

function App() {
  return (
    <Layout hasSider>
      <Sider />
      <Layout>
        <Header />
        <Routes>
          <Route path="/subscriptions" element={<SubscriptionPage />} />
          <Route path="/create" element={<CreateSubscription />} />
          <Route path="/update/:id" element={<EditSubscription />} />
          <Route path="/features" element={<FeatureGetting></FeatureGetting>} />
          <Route
            path="/updateFeatures/:id"
            element={<EditFeature></EditFeature>}
          />
        </Routes>
      </Layout>
    </Layout>
  );
}

export default App;
