import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { WHITE_LOGO } from "../../../util/constants";
import { useTimer } from "react-timer-hook";
import queryString from "query-string";

//css
import * as styles from "./OtpView.module.css";
import { ToastContainer, toast } from "react-toastify";
import { resendOtpApi, verifyOtpApi } from "../../../util/service";

export const OtpView = (props) => {
  const queryParams = queryString.parse(props.location.search);

  const [showResend, setShowResend] = useState(false);
  const [restartTimer, setRestartTimer] = useState(false);
  const [otpToken, setOtpToken] = useState(queryParams.ot);
  const [otp, setOtp] = useState();

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleShowResend = () => {
    setShowResend(!showResend);
  };

  const verifyOtp = () => {
    if (otp.length != 4) {
      toast("Enter otp", {
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
    } else {
      let payload = {
        otp: otp,
        otp_token: otpToken,
      };
      if (queryParams.forgot === "yes") {
        props.history.push(
          "resetPassword?userType=" +
            queryParams.userType +
            "&ot=" +
            otpToken +
            "&otp=" +
            otp
        );
        return;
      }
      verifyOtpApi(payload)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast(res.data.message, {
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
            let payload = {};
            payload.access_token = res.data.access_token;
            payload.userType = queryParams.userType;
            sessionStorage.setItem("payload", JSON.stringify(payload));
            setTimeout(() => {
              if (queryParams.userType === "owner") {
                props.history.push("ownerDashboard/");
              } else {
                props.history.push("residentDashboard/");
              }
            }, 800);
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

  const handleResend = () => {
    setRestartTimer(true);
    let payload = {};
    payload.otp_token = otpToken;
    resendOtpApi(payload)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          toast(res.data.message, {
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
          let payload = {};
          payload.access_token = res.data.access_token;
          sessionStorage.setItem(JSON.stringify(payload));
          setTimeout(() => {
            if (queryParams.userType === "owner") {
              return props.history.push("ownerDashboard/");
            } else {
              return props.history.push("residentDashboard/");
            }
          }, 800);
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
    handleShowResend();
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
              Enter verification code sent on your mobile device
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              separator={<span> </span>}
              inputStyle={styles.otpInput}
              isInputSecure={true}
              containerStyle={styles.otpInputContainer}
            />
          </div>
          {!showResend && (
            <div className="col-10 col-md-12 pe-0 d-flex justify-content-end justify-content-md-center">
              <CountDown
                expireCallback={handleShowResend}
                restartFn={restartTimer}
              />
            </div>
          )}

          <div className="col-12 pt-4 d-flex justify-content-center">
            <button
              type="submit"
              role={"presentation"}
              onClick={verifyOtp}
              className={`${styles.loginButton}`}
            >
              <div
                className={`${styles.loginText} pointer mx-5 px-5 pb-2 mb-1 mt-1 pt-2`}
              >
                Submit
              </div>
            </button>
          </div>
          {showResend && (
            <div className="col-12 pt-4 d-flex justify-content-center">
              <button
                type="submit"
                role={"presentation"}
                onClick={handleResend}
                className={`${styles.resendButton}`}
              >
                <div
                  className={`${styles.resendText} pointer mx-5 px-5 pb-2 mb-1 mt-1 pt-2`}
                >
                  Resend
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CountDown = ({ expiryTime, restartFn, expireCallback }) => {
  // console.log(expiryTime);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTime,
    autoStart: true,
    onExpire: () => expireCallback(),
  });

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120); // 2 minutes timer
    restart(time);
  }, []);

  useEffect(() => {
    if (restartFn) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 120); // 2 minutes timer
      restart(time);
    }
  }, [restartFn]);

  return (
    <div className={styles.timer}>
      <span>{minutes}</span>:<span>{seconds}</span> mins
    </div>
  );
};
