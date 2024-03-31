import React, { useState, useEffect } from "react";
import queryString from "query-string";
import * as styles from "./Signup.module.css";
import { WHITE_LOGO } from "../../../util/constants";
import { useForm } from "react-hook-form";
import { Info } from "../LandingPage/LandingPage";
import { Link } from "react-router-dom";
import { loginApi, signUpApi } from "../../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const Signup = (props) => {
  const queryParams = queryString.parse(props.location.search);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  console.log(errors);

  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    if (payload) {
      try {
        payload = JSON.parse(payload);
        if (payload.access_token) {
          if (payload.userType === "owner") {
            props.history.push(
              "/residentOwnerDashboard?userType=" + queryParams.userType
            );
          } else {
            props.history.push(
              "/residentDashboard?userType=" + queryParams.userType
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const handleLogin = (data) => {
    const payload = data;
    if (data.password !== data.conPassword) {
      toast("Password and confirm password should match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: "error",
        theme: "colored",
        progress: undefined,
      });
      return;
    }
    signUpApi(payload)
      .then((res) => {
        if (res.data.success) {
          props.history.push(
            `/otp?userType=${queryParams.userType}&ot=${res.data.otp_token}`
          );
        }
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response) {
          if (err.response.data) {
            toast(err.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              type: "error",
              theme: "colored",
              progress: undefined,
            });
          } else {
            toast(err, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              type: "error",
              theme: "colored",
              progress: undefined,
            });
          }
        } else {
          toast(err, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: "error",
            theme: "colored",
            progress: undefined,
          });
        }
      });
  };

  const onSubmit = (data) => {
    console.log(data);
    handleLogin(data);
  };

  return (
    <div className="d-flex justify-content-center align-items-center primaryBgColor">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container">
        <div className={`row pb-5 ${styles.conCo}`}>
          <div className="col-12 d-flex justify-content-center">
            <img
              src={WHITE_LOGO}
              alt="logo"
              className={`img-responsive ${styles.logo}`}
            />
          </div>
          <div className="col-12 pb-4 d-flex justify-content-center">
            <div className={`${styles.text1} text-center`}>
              Enter your information for registration with parkadda
            </div>
          </div>
          <form
            name="loginForm"
            onSubmit={handleSubmit(onSubmit)}
            className={`mt-3`}
          >
            <div className="col-12 d-flex justify-content-center">
              <div className="row">
                <div className="col-md-4 offset-md-4 col-10 offset-1">
                  <div className={`${styles.formInput} form-group mb-3`}>
                    <label> Name * </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      {...register("name", {
                        required: "Please enter your name",
                      })}
                    />
                    {errors.name && (
                      <span className="errorText">{errors.name.message}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-4 offset-md-4 col-10 offset-1">
                  <div className={`${styles.formInput} form-group mb-3`}>
                    <label> Email Address * </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter email id"
                      {...register("email", {
                        required: "Please enter your email id",
                      })}
                    />
                    {errors.email && (
                      <span className="errorText">{errors.email.message}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-4 offset-md-4 col-10 offset-1">
                  <div className={`${styles.formInput} form-group mb-3`}>
                    <label> Mobile No * </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="mobile no"
                      inputMode="numeric"
                      maxLength="10"
                      {...register("mobile", {
                        required: "Please enter your mobile number",
                        pattern: {
                          value: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, // eslint-disable-line no-useless-escape
                          message: "Please enter your valid phone number",
                        },
                        maxLength: {
                          value: 10,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                    {errors.mobile && (
                      <span className="errorText">{errors.mobile.message}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-4 offset-md-4 col-10 offset-1">
                  <div className={`${styles.formInput} form-group mb-3`}>
                    <label> Password * </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      {...register("password", {
                        required: "Please enter password",
                      })}
                      // aria-label="password"
                      // aria-describedby="basic-addon1"
                    />
                    {errors.password && (
                      <span className="errorText">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-4 offset-md-4 col-10 offset-1">
                  <div className={`${styles.formInput} form-group mb-3`}>
                    <label>Confirm Password * </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter confirm password"
                      {...register("conPassword", {
                        required: "Please enter confirm password",
                      })}
                    />
                    {errors.conPassword && (
                      <span className="errorText">
                        {errors.conPassword.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-12 pt-4 d-flex justify-content-center">
                  <button
                    type="submit"
                    role={"presentation"}
                    // onClick={handleLogin}
                    className={`${styles.loginButton}`}
                  >
                    <div
                      className={`${styles.loginText} pointer mx-5 px-5 pb-2 mb-1 mt-1 pt-2`}
                    >
                      Submit
                    </div>
                  </button>
                </div>
                <div className="col-12 pt-3 pb-3 d-flex justify-content-center">
                  <div
                    className={`secondaryColor px-3 pointer ${styles.loginBtn1}`}
                  >
                    <Link
                      className={"noDecoration"}
                      to={`/login?userType=owner`}
                    >
                      <div
                        className={`mx-4 px-5 pt-2 pb-2 mt-1 mb-1 ${styles.text1}`}
                      >
                        Go Back
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
