import React, { useState } from "react";
import { WHITE_LOGO } from "../../../util/constants";
import { OtpView } from "../OtpView/OtpView";
import { useForm } from "react-hook-form";
import queryString from "query-string";

// css
import * as styles from "./ForgotPassword.module.css";
import { toast, ToastContainer } from "react-toastify";
import { forGotPasswordApi } from "../../../util/service";

export const ForgotPassword = (props) => {
  const queryParams = queryString.parse(props.location.search);
  const [mobileNo, setMobileNo] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  console.log(errors);

  const handleMobile = (e) => {
    setMobileNo(e.target.value);
  };

  const handleForgotPassword = () => {
    if (!mobileNo || mobileNo.length != 10) {
      toast("Enter Proper Mobile No !", {
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
      let payload = {
        mobile: mobileNo,
      };
      forGotPasswordApi(payload)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            props.history.push(
              "otp?ot=" +
                res.data.forget_password_token +
                "&forgot=yes&userType=" +
                queryParams.userType
            );
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
    }
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
              Enter mobile no for verification
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
                onChange={handleMobile}
              />
              {errors.mobileNo && (
                <span className="errorText">{errors.mobileNo.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 pt-4 d-flex justify-content-center">
            <button
              type="submit"
              role={"presentation"}
              onClick={handleForgotPassword}
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
