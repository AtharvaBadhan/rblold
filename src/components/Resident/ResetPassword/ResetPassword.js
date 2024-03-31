import React, { useState } from "react";
import { WHITE_LOGO } from "../../../util/constants";
import { OtpView } from "../OtpView/OtpView";
import { useForm } from "react-hook-form";
import queryString from "query-string";

// css
import * as styles from "./ResetPassword.module.css";
import { resetPasswordApi } from "../../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const ResetPassword = (props) => {
  const queryParams = queryString.parse(props.location.search);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  console.log(errors);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordReset = () => {
    if (!password) {
      toast("Enter Password", {
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
    if (!confirmPassword) {
      toast("Enter Confirm Password", {
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

    if (password !== confirmPassword) {
      toast("Password and Confirm Password should match.", {
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
    let payload = {};
    payload.password = password;
    payload.forget_password_token = queryParams.ot;
    payload.otp = queryParams.otp;

    resetPasswordApi(payload)
      .then((res) => {
        if (res.data.success) {
          props.history.push("/login?userType=" + queryParams.userType);
        } else {
          toast(res.data.message, {
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

  return (
    <div className="d-flex justify-content-center align-items-center primaryBgColor vh-100">
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
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <img
              src={WHITE_LOGO}
              alt="logo"
              className={`img-responsive ${styles.logo}`}
            />
          </div>
          <div className="col-12 d-flex justify-content-center px-3 pb-5 text-center">
            <div className={styles.verificationTxt}>
              Reset your password for quick access
            </div>
          </div>
          <div className="col-md-4 offset-md-4 col-10 offset-1">
            <div className={`${styles.formInput} form-group mb-3`}>
              <label> New Password * </label>
              <input
                type="password"
                className="form-control"
                placeholder="enter new password"
                onChange={handlePassword}
              />
            </div>
          </div>

          <div className="col-md-4 offset-md-4 col-10 offset-1">
            <div className={`${styles.formInput} form-group mb-3`}>
              <label> Confirm New Password * </label>
              <input
                type="password"
                className="form-control"
                placeholder="enter confirm new password"
                onChange={handleConfirmPassword}
              />
            </div>
          </div>

          <div className="col-12 pt-4 d-flex justify-content-center">
            <button
              type="submit"
              role={"presentation"}
              onClick={handlePasswordReset}
              className={`${styles.loginButton}`}
            >
              <div
                className={`${styles.loginText} pointer mx-5 px-5 pb-2 mb-1 mt-1 pt-2`}
              >
                Submit
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
