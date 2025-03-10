import React, { useEffect, useState } from "react";
// import { useMsal } from "@azure/msal-react";
// import { postApis } from "../utils/api";
// import { callPostAPI } from "../utils/service";
// import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { Button, Card, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import "../assets/scss/Login.scss";
//import { useDispatch } from "react-redux";
//import useSettings from "../utils/setSettings";

const Login = () => {
  //   const { instance } = useMsal();
  const navigate = useNavigate();
  //   const { loading, settings } = useSettings();

  const { Title, Text } = Typography;

  //   useEffect(() => {
  //     initializeMSAL();
  //   }, []);

  //   async function initializeMSAL() {
  //     console.log(settings);
  //     try {
  //       await instance.initialize();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   const handleLogin = async () => {
  //     let response = await instance
  //       .loginPopup({
  //         scopes: ["user.read"],
  //         prompt: "select_account",
  //       })
  //       .catch((e) => {
  //         if (e instanceof InteractionRequiredAuthError) {
  //           instance.loginPopup({
  //             scopes: ["user.read"],
  //             prompt: "select_account",
  //           });
  //         }
  //       });
  //     console.log(response);

  //     try {
  //       let successed = await userLogin({
  //         token: response?.idToken,
  //         email: response?.account.username,
  //         name: response?.account.name,
  //         tokenDetails: response?.idTokenClaims,
  //         EntraIdAccessToken: response?.accessToken,
  //       });

  //       console.log(successed);

  //       if (successed === true) {
  //         setTimeout(() => {
  //           getSettigns();
  //           navigate("/admin");
  //         }, 500);
  //       } else {
  //         console.log(`Access Denied`, "Please contact to Admin.");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const userLogin = async (data) => {
  //     try {
  //       const response = await callPostAPI(postApis.UserLogin, data);
  //       console.log("userLogin response:", response);
  //       console.log("userLogin userData :", response.userData);
  //       if (response.success === true) {
  //         localStorage.setItem("isAuth", true);
  //         localStorage.setItem(
  //           "userName",
  //           JSON.stringify(response.userData.name)
  //         );
  //         localStorage.setItem("userId", response.userData.userId);
  //         localStorage.setItem(
  //           "userEmail",
  //           JSON.stringify(response.userData.email)
  //         );
  //         localStorage.setItem("userType", response.userData.usertype);
  //         localStorage.setItem(
  //           "jobTitle",
  //           JSON.stringify(response.userData.jobTitle)
  //         );
  //         const highestKey = Object.entries(
  //           response.userData.searchPrefrence
  //         ).reduce(
  //           (acc, [key, value]) => {
  //             return value > acc.value ? { key, value } : acc;
  //           },
  //           { key: null, value: -Infinity }
  //         );
  //         if (highestKey.key === "chatSearch") {
  //           localStorage.setItem("searchPrefrence", 3);
  //         } else if (highestKey.key === "internetSearch") {
  //           localStorage.setItem("searchPrefrence", 2);
  //         } else if (highestKey.key === "fileSearch") {
  //           localStorage.setItem("searchPrefrence", 1);
  //         }

  //         return true;
  //       }

  //       return false;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const handleLogin = () => {
    navigate("/subscriptions");
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <Title level={2} className="login-title">
          Welcome to PromptX Admin
        </Title>
        <Text className="login-subtitle">Please log in to continue</Text>
        <Button
          type="primary"
          size="large"
          className="login-button"
          onClick={handleLogin}
          icon={<ArrowRightOutlined />}
        >
          Login
        </Button>
      </Card>
    </div>
  );
};
export default Login;
