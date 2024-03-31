import React, { useEffect, useState } from "react";
import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./Heartbeat.module.css";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import { getAllControllerApi } from "../../util/service";

import moment from "moment";

export const ResidentHeartbeat = (props) => {
  return (
    <div className="primaryBgColor">
      <div className={`container  ${styles.conCo}`}>
        <Header />
        <Hr />
        <ControllerCard {...props} />
      </div>
    </div>
  );
};

const Hr = (props) => {
  return (
    <div className="row">
      <div className="col-12 px-4">
        <hr className={styles.whiteHr} />
      </div>
    </div>
  );
};

const ControllerCard = (props) => {
  const [data, setData] = useState();
  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    if (!payload) {
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    try {
      payload = JSON.parse(payload);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    let societyId = sessionStorage.getItem("societyToken");

    let request = {};
    request.access_token = payload.access_token;
    request.resident_token = societyId;
    getAllControllerApi(request)
      .then((res) => {
        console.log(res.data);
        if (res.data.status !== "success") {
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
        } else {
          if (res.data.message.status === 200) {
            setData(res.data.message.data);
          } else {
            toast(res.data.message.msg, {
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
  }, []);
  return (
    <div className="row">
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
      <div className="col-12 pb-2 pt-3">
        <div className={styles.title}> Heartbeat of Controller </div>
      </div>
      <div className="col-12">
        <div className="row pt-4">
          {data &&
            data.fastag_command_controls.map((item) => (
              <div className="col-12 col-md-6 px-4 pb-3 pb-md-5 pe-md-5">
                <div className={`row pb-4 pt-4 ${styles.cardContainer}`}>
                  <div className="col-3 col-md-3 ps-4 d-flex align-items-center">
                    <FontAwesomeIcon
                      color={"#505050"}
                      size={"4x"}
                      icon={faMicrochip}
                    />
                  </div>
                  <div className="col-9 col-md-9">
                    <div className="row">
                      <div className="col-5 col-md-6">
                        <div className={styles.SerialNoTxt}>Serial No</div>
                      </div>
                      <div className="col-7 col-md-6">
                        <div className={styles.SerialNoValue}>
                          {item.serial_no}
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-md-6 col-5">
                        <div className={styles.SerialNoTxt}>Gate Name</div>
                      </div>
                      <div className="col-7 col-md-6">
                        <div className={styles.SerialNoValue}>
                          {item.society_gate.name}
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-md-6 col-5">
                        <div className={styles.SerialNoTxt}>Heartbeat</div>
                      </div>
                      <div className="col-7 col-md-6">
                        <div className={styles.SerialNoValue}>
                          {item.last_heartbeat_at &&
                            moment(
                              item.last_heartbeat_at,
                              "YYYY-MM-DD kk:mm:ss"
                            ).fromNow()}
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-md-6 col-5">
                        <div className={styles.SerialNoTxt}>Sync Status</div>
                      </div>
                      <div className="col-7 col-md-6">
                        <div className={styles.SerialNoValue}>
                          {item.sync_with_society_status}
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-md-6 col-5">
                        <div className={styles.SerialNoTxt}>Sync Index</div>
                      </div>
                      <div className="col-7 col-md-6">
                        <div className={styles.SerialNoValue}>
                          {item.sync_vehicle_index}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const Header = (props) => {
  let history = useHistory();
  return (
    <div className="row primaryBgColor sticky-top">
      <div className="row">
        <div className="col-12 d-flex justify-content-center justify-content-md-start">
          <img src={WHITE_LOGO} className={`${styles.icon} img-responsive`} />
        </div>
      </div>
      <div className="col-12 px-4 pb-2">
        <div
          role="presentation"
          onClick={() => history.goBack()}
          className="pointer"
        >
          <FontAwesomeIcon color={"#ffffff"} size="lg" icon={faAngleLeft} />
          <span className={`${styles.breadCrumb} ps-2`}> Dashboard </span>
        </div>
      </div>
    </div>
  );
};
