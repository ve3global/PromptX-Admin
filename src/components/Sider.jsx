import React, { useState } from "react";
import { Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../assets/scss/Sider.scss"; // Importing the corresponding styles
import promptx from "../assets/promptx.png";

const SiderComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`custom-sider ${collapsed ? "collapsed" : ""}`}>
      {/* Placeholder image */}
      <div className="logo">
        <img
          src={promptx} // Replace with your image URL
          alt="Placeholder"
          className="sider-image"
        />
      </div>

      <Menu theme="light" mode="inline" className="ant-menu">
        <Menu.SubMenu key="sub1" title="Subscriptions">
          <Menu.Item key="1" className="menu-item">
            Active Subscriptions
          </Menu.Item>
          <Menu.Item key="2" className="menu-item">
            Subscription Plans
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" title="Permissions">
          <Menu.Item key="3" className="menu-item">
            User Permissions
          </Menu.Item>
          <Menu.Item key="4" className="menu-item">
            Role Permissions
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>

      {/* <div className="sider-toggle" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div> */}
    </div>
  );
};

export default SiderComponent;
