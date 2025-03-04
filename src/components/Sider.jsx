import React from "react";
import { Menu } from "antd";
import "../assets/scss/Sider.scss"; // Importing the corresponding styles
import promptx from "../assets/promptx.png";
import { Link } from "react-router-dom";

const SiderComponent = () => {
  return (
    <div className="custom-sider">
      {/* Placeholder image */}
      <div className="logo">
        <img src={promptx} alt="Placeholder" className="sider-image" />
      </div>

      <Menu theme="light" mode="inline" className="ant-menu">
        <Menu.Item key="1" className="menu-item">
          Subscriptions
          <Link to="/subscriptions"></Link>
        </Menu.Item>
        <Menu.Item key="2" className="menu-item">
          Features
          <Link to="/features"></Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SiderComponent;
