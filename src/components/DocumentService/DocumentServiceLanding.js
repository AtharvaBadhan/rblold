import React, { useState, useEffect } from "react";
import queryString from "query-string";
import * as styles from "./DocumentService.module.css";
import { WHITE_LOGO } from "../../util/constants";
import { useForm } from "react-hook-form";
import { Info } from "../Resident/LandingPage/LandingPage";
import { Link } from "react-router-dom";
import { loginApi, validateServiceTokenNo } from "../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const DocumentServiceLanding = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  console.log(errors);

  useEffect(() => {
    let payload = sessionStorage.getItem("documentservice");
    if (payload) {
      try {
        payload = JSON.parse(payload);
        if (payload.service_token_no) {
          props.history.push("/viewDocument");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const handleLogin = (data) => {
    const payload = {
      //   userType: queryParams.userType,
      service_token_no: data.serviceTokenNo.toUpperCase(),
    };
    validateServiceTokenNo(payload)
      .then((res) => {
        if (res.data.status === "success") {
          sessionStorage.setItem(
            "documentservice",
            JSON.stringify(res.data.payload)
          );

          props.history.push(`/viewDocument`);
        } else {
          toast(res.data.msg, {
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
              Welcome To Parkadda DMS Club !
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
                    <label> Service Token No * </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="service token no"
                      maxLength="8"
                      {...register("serviceTokenNo", {
                        required: "Please enter your service token no",

                        maxLength: {
                          value: 8,
                          message: "Invalid service token no",
                        },
                      })}
                    />
                    {errors.serviceTokenNo && (
                      <span className="errorText">
                        {errors.serviceTokenNo.message}
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
                <div className="col-12 d-flex pointer justify-content-center pt-3 pb-3">
                  <Link
                    className={"noDecoration"}
                    // to={`/forgotPassword?userType=${queryParams.userType}`}
                  >
                    <div className={styles.forgotPassword}>
                      Forgot service token no ?
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
