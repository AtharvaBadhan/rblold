import React, { useState, useEffect } from "react";
import queryString from "query-string";
import * as styles from "./LoginPage.module.css";
import { WHITE_LOGO } from "../../../util/constants";
import { useForm } from "react-hook-form";
import { Info } from "../LandingPage/LandingPage";
import { Link } from "react-router-dom";
import {
  getResidentMemberDetailsByMobileNoAPI,
  loginApi,
  verifySocietyTokenApi,
} from "../../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const LoginPage = (props) => {
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
    let userType = sessionStorage.getItem("userType");
    if (payload) {
      try {
        payload = JSON.parse(payload);
        if (payload.access_token) {
          if (userType === "owner") {
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
    const payload = {
      userType: queryParams.userType,
      mobile: data.mobileNo,
      password: data.password,
      societyId: data.societyToken.toUpperCase(),
    };

    loginApi(payload)
      .then((res) => {
        if (!res.data.isOTPVerified) {
          props.history.push(
            `/otp?userType=${queryParams.userType}&ot=${res.data.otp_token}`
          );
        } else {
          let payload = res.data;
          // payload.userType = queryParams.userType;

          sessionStorage.setItem("payload", JSON.stringify(payload));

          let req = {
            access_token: payload.access_token,
            society_token_id: data.societyToken.toUpperCase(),
          };

          verifySocietyTokenApi(req).then((res) => {
            console.log(res);
            sessionStorage.setItem("society", JSON.stringify(res.data));
            sessionStorage.setItem("userType", res.data.type);
            sessionStorage.setItem(
              "societyToken",
              data.societyToken.toUpperCase()
            );
            let userTypeNew = res.data.type;

            if (res.data.status == "success") {
              let pay = {};
              pay.access_token = payload.access_token;
              pay.resident_token = data.societyToken.toUpperCase();
              getResidentMemberDetailsByMobileNoAPI(pay)
                .then((res) => {
                  toast("Access Granted,Welcome !", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    type: "success",
                    theme: "colored",
                    progress: undefined,
                  });
                  sessionStorage.setItem("userId", res.data.message.data.id);

                  if (userTypeNew === "resident") {
                    props.history.push(
                      `/residentDashboard?userType=${userTypeNew}`
                    );
                  } else {
                    props.history.push(
                      `/residentOwnerDashboard?userType=${userTypeNew}`
                    );
                  }
                })
                .catch((err) => {});
            } else {
              toast(res.data, {
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
          });
        }
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response) {
          if (err.response.data) {
            toast(err.response.data.msg, {
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
              Enter your phone number and password for login
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
                    <label> Mobile No * </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="mobile no"
                      inputMode="numeric"
                      maxLength="10"
                      {...register("mobileNo", {
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
                    {errors.mobileNo && (
                      <span className="errorText">
                        {errors.mobileNo.message}
                      </span>
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
                    <label> Society Token * </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="society token"
                      {...register("societyToken", {
                        required: "Please enter your society",
                      })}
                    />
                    {errors.societyToken && (
                      <span className="errorText">
                        {errors.societyToken.message}
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
                      Login
                    </div>
                  </button>
                </div>
                <div className="col-12 pt-3 pb-3 d-flex justify-content-center">
                  <div
                    className={`secondaryColor px-3 pointer ${styles.loginBtn1}`}
                  >
                    <Link
                      className={"noDecoration"}
                      to={`/signup?userType=` + queryParams.userType}
                    >
                      <div
                        className={`mx-4 px-5 pt-2 pb-2 mt-1 mb-1 ${styles.text1}`}
                      >
                        Sign up
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 d-flex pointer justify-content-center pt-3 pb-3">
                  <Link
                    className={"noDecoration"}
                    to={`/forgotPassword?userType=${queryParams.userType}`}
                  >
                    <div className={styles.forgotPassword}>
                      Forgot password ?
                    </div>
                  </Link>
                </div>

                <div className="col-12">
                  <Info />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
