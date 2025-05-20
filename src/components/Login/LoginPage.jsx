import React, { useState } from "react";
import login_img from "../../assets/images/login_img.svg";
import mail from "../../assets/images/icon-images/mail.svg";
import eye from "../../assets/images/icon-images/eye.svg";
import lock from "/src/assets/images/icon-images/lock.svg";
import goodeye from "../../assets/images/icon-images/goodeye.svg";
import mainImage from "../../assets/images/icon-images/Logo.svg";
import "./login.css";
import { login } from "../../api/api_calls/apiCalls.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Dow from "../../assets/images/Dow.svg";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "./loginValidation.js";
import WhiteCircularIndeterminate from "../WhiteLoader.jsx";
import { Box } from "@mui/material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (formData) => {
    try {
      console.log("hello before");
      const response = await login(formData);
      console.log(response, "headers");

      // debugger;
      // const token = response.headers.get("Authorization");
      // console.log("TOK", token);

      const token = response.token;
      console.log("Token from header:", token);

      if (response) {
        // Storing the data in localStorage
        localStorage.setItem("image_url", response.user.imageUrl);
        localStorage.setItem("first_name", response.user.firstName);
        localStorage.setItem("last_name", response.user.lastName);
      }

      // const tok = btoken?.startsWith("Bearer ") ? btoken.split(" ")[1] : null;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.error("Login failed:", error);
      setError("api", { message: error.message || "Login failed" });
    }
  };

  const img = localStorage.getItem("image_url");
  return (
    <div className="outer_main">
      <div className="left_half">
        <img
          src={
            "https://summer2025bucket.s3.ap-south-1.amazonaws.com/DOW_IMAGES/homepageimageresize.png"
          }
          alt="Login"
          className="main_img"
        />
      </div>
      <div className="wrap3">
        <div className="small_form">
          <div className="container1">
            <img src={Dow} alt="Logo" className="mainLogoResize" />
          </div>
          <div className="container2">
            <p>Welcome to Our Platform!</p>
          </div>
          <div className="container3">
            <form
              className="login_form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="form-group">
                <p className="go_text">Email Address</p>
                <div className="inputwrap">
                  <img src={mail} alt="Mail Icon" width="20" height="20" />
                  <input
                    className="text_input"
                    type="email"
                    placeholder="Enter email here"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="error-text">{errors.email.message}</p>
                )}
              </div>

              <div className="form-group">
                <p className="go_text">Password</p>
                <div className="inputwrap">
                  <img src={lock} alt="Lock Icon" width="20" height="20" />
                  <input
                    className="text_input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <img
                    src={showPassword ? goodeye : eye}
                    className="eye"
                    alt="Eye Icon"
                    width="20"
                    height="20"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {errors.password && (
                  <p className="error-text">{errors.password.message}</p>
                )}
              </div>

              {errors.api && <p className="error-text">{errors.api.message}</p>}

              <button
                className="login_cont"
                type="submit"
                disabled={isSubmitting}
                onClick={(e) => {
                  console.log("Button clicked");
                }}
              >
                {isSubmitting ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%", // ✅ Ensures consistent width
                    }}
                  >
                    <WhiteCircularIndeterminate size={20} />
                  </Box>
                ) : (
                  <Box sx={{ visibility: isSubmitting ? "hidden" : "visible" }}>
                    Login
                  </Box> // ✅ Keeps space occupied
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
