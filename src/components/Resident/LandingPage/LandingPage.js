import React, { useEffect } from "react";

import * as styles from "./LandingPage.module.css";

import { WHITE_LOGO } from "../../../util/constants";
import { Link } from "react-router-dom";

export const LandingPage = (props) => {
  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    if (payload) {
      try {
        payload = JSON.parse(payload);
        if (payload.access_token) {
          if (payload.userType === "owner") {
            props.history.push("/ownerDashboard");
          } else {
            props.history.push("/residentDashboard");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center primaryBgColor vh-100">
      <div className="container">
        <div className="d-flex flex-column">
          <ParkAddaLogo />
          <LandingButton />
          <Info />
        </div>
      </div>
    </div>
  );
};

export const Info = (props) => {
  return (
    <div className="row">
      <div className="col-10 col-md-12 pt-5 d-flex justify-content-center">
        <div className={`${styles.infoText} ps-md-0 ps-5 text-center`}>
          Get in touch with ParkAdda Team :
          <span className="primaryColor2"> +91 99300 39175 </span>
        </div>
      </div>
    </div>
  );
};

const ParkAddaLogo = (props) => {
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <img
          src={WHITE_LOGO}
          alt="logo"
          className={`img-responsive ${styles.logo}`}
        />
      </div>
    </div>
  );
};

const LandingButton = (props) => {
  return (
    <div className="row">
      <div className="col-12 pb-3 d-flex justify-content-center">
        <div className={`secondaryColor pointer ${styles.loginBtn1}`}>
          <Link className={"noDecoration"} to={`/login?userType=owner`}>
            <div className={`mx-4 px-5 pt-2 pb-2 ${styles.text1}`}>
              {" "}
              Login as owner{"   "}
            </div>
          </Link>
        </div>
      </div>
      <div className="col-12 pt-2 d-flex justify-content-center">
        <div className={`secondaryColor pointer ${styles.loginBtn1}`}>
          <Link className={"noDecoration"} to={`/login?userType=resident`}>
            <div className={`mx-3 px-5 pt-2 pb-2 ${styles.text1}`}>
              {" "}
              Login as resident{" "}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
