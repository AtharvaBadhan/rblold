import React, { useState, useEffect } from "react";

import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./ViewPopUp.module.css";

import { useHistory } from "react-router-dom";
import { getSingleSocietyDetailApi } from "../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const ViewPopUp = (props) => {
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

    props.location && props.location.state && setData(props.location.state);
  }, [props.location]);

  return (
    <div className="primaryBgColor">
      <div className={`container  ${styles.conCo}`}>
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
        <Header payload={data} />
        <Hr />
        <SocietyDetail payload={data} />
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

const SocietyDetail = (props) => {
  let history = useHistory();

  const title = (str) => {
    // return str.replace(/(^|\s)\S/g, function (t) {
    //   return t.toUpperCase();
    // });
    return str;
  };
  return (
    <div className="row">
      <div className="col-12 px-4 pb-4 pt-3">
        <div className={styles.title}>
          {props.payload && props.payload.title}
        </div>
      </div>

      {props.payload &&
        Object.keys(props.payload).map(
          (item, index) =>
            item !== "backText" &&
            item !== "title" &&
            item !== "created_at" &&
            item !== "society_member_id" &&
            item !== "society_gate_id" &&
            item !== "society_id" &&
            item !== "id" &&
            item !== "updated_at" && (
              <>
                <div className="col-6 px-4">
                  <div className={styles.keyName}>
                    {title(item.replaceAll("_", " "))}
                  </div>
                </div>
                <div className="col-6 px-4">
                  <div className={styles.valueName}>
                    {(props.payload && item === "society_member") ||
                    item === "society_gate"
                      ? title(props.payload[item].name)
                      : title(props.payload[item])}
                  </div>
                </div>
                <div className="col-12">
                  <Hr />
                </div>
              </>
            )
        )}

      <div className="col-12 pb-5 d-flex pointer justify-content-center pt-3 pb-3">
        <div
          role={"presentation"}
          onClick={() => history.goBack()}
          className={styles.resetBtn}
        >
          back
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
          <span className={`${styles.breadCrumb} ps-2`}>
            {" "}
            {props.payload && props.payload.backText}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
