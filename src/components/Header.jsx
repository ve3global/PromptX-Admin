import React from "react";
import { Badge } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import "../assets/scss/Header.scss"; // Import the corresponding styles

const HeaderComponent = () => {
  return (
    <div className="header-container">
      <div className="header-wrapper">
        <div className="header-right">
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
