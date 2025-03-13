import React from "react";
import { Badge } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import "../assets/scss/Header.scss";

const HeaderComponent = () => {
  const location = useLocation();
  let headerTitle = "Subscription Management";

  if (location.pathname === "/subscriptions") {
    headerTitle = "Subscription Management";
  } else if (location.pathname === "/features") {
    headerTitle = "Features Management";
  } else if (location.pathname === "/account-listing") {
    headerTitle = "List Of Accounts";
  }

  return (
    <div className="header-container">
      <div
        className="header-wrapper"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="header-title" style={{ margin: 5, marginLeft: 700 }}>
          {headerTitle}
        </h2>
        <div
          className="header-right"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Badge count={5} className="badge">
            <BellOutlined style={{ fontSize: "20px", color: "#333" }} />
          </Badge>
          <div className="user-icon">
            <UserOutlined style={{ fontSize: "20px", color: "#333" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
