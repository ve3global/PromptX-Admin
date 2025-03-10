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
import Login from "./pages/Login";
function App() {
  return (
    <Layout hasSider>
      <Sider />
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<SubscriptionPage />} />
          {/* <Route path="/create" element={<CreateSubscription />} />
          <Route path="/update/:id" element={<EditSubscription />} /> */}
          <Route path="/features" element={<FeatureGetting />} />
          <Route path="/updateFeatures/:id" element={<EditFeature />} />
          <Route path="/account-listing" element={<AccountListing />} />
        </Routes>
      </Layout>
    </Layout>
  );
}

export default App;
