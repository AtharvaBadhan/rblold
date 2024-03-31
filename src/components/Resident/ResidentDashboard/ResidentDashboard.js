import React, { useEffect } from "react";

import { WHITE_LOGO } from "../../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserPlus,
  faBuilding,
  faCarSide,
  faCarBattery,
  faChartLine,
  faCar,
  faToriiGate,
  faMicrochip,
  faSatelliteDish,
  faUsers,
  faHeartbeat,
  faCartPlus,
  faCarAlt,
  faIdCard,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./ResidentDashboard.module.css";
import { Link } from "react-router-dom";

//constants

const payload = [
  {
    name: "View Society",
    desc: "Society Details",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faBuilding} />,
    link: "/viewSociety?userType=resident",
  },

  {
    name: "Add Vehicle",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCarSide} />,
    link: "/addVehicle?userType=resident",
  },
  {
    name: "View Vehicle",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCar} />,
    link: "/viewVehicle?userType=resident",
  },
  {
    name: "Heartbeat",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faHeartbeat} />,
    link: "/residentheartbeat?userType=resident",
  },
  {
    name: "Vehicle Entry",
    desc: "Vehicle Entry",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCarAlt} />,
    link: "/viewEntryVehicle?userType=resident",
  },
  {
    name: "Vehicle Exit",
    desc: "Vehicle Exit Report",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCarSide} />,
    link: "/viewExitVehicle?userType=resident",
  },
  {
    name: "Entry ANPR Camera",
    desc: "Entry ANPR Camera",
    icon: (
      <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCameraRetro} />
    ),
    link: "/residentEntryAnprCamera?userType=resident",
  },
  {
    name: "Exit ANPR Camera",
    desc: "Exit ANPR Camera",
    icon: (
      <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCameraRetro} />
    ),
    link: "/residentExitAnprCamera?userType=resident",
  },
  // {
  //   name: "Fastag",
  //   desc: "register resident",
  //   icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faIdCard} />,
  //   link: "/fastag?userType=owner",
  // },
];

export const ResidentDashboard = (props) => {
  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    if (!payload) {
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    try {
      payload = JSON.parse(payload);
      // setAccessToken(payload.access_token);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
  }, []);

  return (
    <div className={`primaryBgColor`}>
      <div className={`container ${styles.conCo}`}>
        <Header {...props} />
        <CardTile />
      </div>
    </div>
  );
};

const Header = (props) => {
  const handleLogout = () => {
    sessionStorage.clear();
    props.history.push("/");
  };
  return (
    <div className="row sticky-top primaryBgColor">
      <div className="col-12">
        <div className="row">
          <div className="col-12 d-flex justify-content-center d-md-none">
            <img
              src={WHITE_LOGO}
              alt="logo"
              className={`img-responsive ${styles.logo}`}
            />
          </div>
        </div>
        {/* <div className="row">
          <div className="col-12">
            <div className="d-flex d-md-none">
              <div className={`primaryColor2 pt-4 px-3 ${styles.text22}`}>
                Welcome, Lokesh{" "}
              </div>
            </div>
          </div>
        </div> */}
        <div className="row pb-5">
          <div className="col-12 col-md-6 d-none d-md-flex justify-content-center justify-content-md-start">
            <img
              src={WHITE_LOGO}
              alt="logo"
              className={`img-responsive ${styles.logo}`}
            />
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-between justify-content-md-end">
            <div
              role={"presentation"}
              onClick={handleLogout}
              className={`d-flex d-md-none primaryColor2 d-flex align-items-center justify-content-start px-3 ${styles.text22}`}
            >
              Logout
            </div>
            <div
              className={`d-flex align-items-center justify-content-end pointer pe-4`}
            >
              <div
                role={"presentation"}
                onClick={handleLogout}
                className={`d-none d-md-flex primaryColor2 d-flex align-items-center justify-content-start px-3 ${styles.text22}`}
              >
                Logout
              </div>
              <FontAwesomeIcon color={"#ffffff"} size={"lg"} icon={faUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardTile = (props) => {
  return (
    <div className={`row pt-md-0 `}>
      {payload.map((item, index) => (
        <div
          className={` col-12 col-md-4 mb-3 pt-3 px-4 mb-md-5 pt-md-0 px-md-5 pb-md-3 `}
        >
          <Link className="noDecoration" to={item.link}>
            <div
              className={`${styles.borderCo} pointer pt-3 pb-4 pt-md-5 pb-md-4 row justify-content-center align-items-center`}
            >
              <div className="col-12 pb-3 pt-3 d-flex justify-content-center">
                {item.icon}
              </div>
              <div className="col-12 pb-4 justify-content-center secondaryColor text-center">
                <div className={`${styles.text33} secondaryColor`}>
                  {item.name}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
