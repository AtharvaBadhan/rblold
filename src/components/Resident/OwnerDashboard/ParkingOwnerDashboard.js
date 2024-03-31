import React, { useEffect, useState } from "react";

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
  faOtter,
  faTag,
  faIdCardAlt,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./OwnerDashboard.module.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getAllParkingLists } from "../../../util/service";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../../Loader/Loader";

//constants

const payload = [
  //   {
  //     name: "View Society",
  //     desc: "Society Details",
  //     icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faBuilding} />,
  //     link: "/viewSociety?userType=owner",
  //   },
  //   {
  //     name: "Add Gates",
  //     desc: "Society Details",
  //     icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faToriiGate} />,
  //     link: "/addSocietyGate?userType=owner",
  //   },
  //   {
  //     name: "View Gates",
  //     desc: "View Details",
  //     icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faToriiGate} />,
  //     link: "/viewSocietyGate?userType=owner",
  //   },
  //   {
  //     name: "Add Controller",
  //     desc: "View Details",
  //     icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faMicrochip} />,
  //     link: "/addController?userType=owner",
  //   },
  //   {
  //     name: "View Controller",
  //     desc: "register resident",
  //     icon: (
  //       <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faSatelliteDish} />
  //     ),
  //     link: "/viewController?userType=owner",
  //   },
  //   {
  //     name: "Add Residence",
  //     desc: "register resident",
  //     icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faUser} />,
  //     link: "/addResident?userType=owner",
  //   },
  //   {
  //     name: "View Residence",
  //     desc: "register resident",
  //     icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faUsers} />,
  //     link: "/viewResident?userType=owner",
  //   },

  {
    name: "View Staff",
    desc: "View Staff",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faUser} />,
    link: "/viewStaff?userType=owner",
  },
  {
    name: "Add Staff",
    desc: "Add Staff",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faUserPlus} />,
    link: "/addStaff?userType=owner",
  },
  {
    name: "Add Exception Vehicle",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCarSide} />,
    link: "/addExceptionVehicle?userType=owner",
  },
  {
    name: "View Exception Vehicle",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCar} />,
    link: "/viewExceptionVehicle?userType=owner",
  },
  {
    name: "Heartbeat",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faHeartbeat} />,
    link: "/heartbeat?userType=owner",
  },
  {
    name: "Vehicle Entry Report",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCar} />,
    link: "/vehicleInReport?userType=owner",
  },
  {
    name: "Vehicle Exit Report",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCarAlt} />,
    link: "/vehicleOutReport?userType=owner",
  },
  {
    name: "Vehicle Report",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCar} />,
    link: "/vehicleInOutReport?userType=owner",
  },
  {
    name: "Fastag Transaction Report",
    desc: "register resident",
    icon: <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faIdCardAlt} />,
    link: "/fastagTransactionReport?userType=owner",
  },
  {
    name: "Transaction Report",
    desc: "register resident",
    icon: (
      <FontAwesomeIcon color={"#ffffff"} size={"3x"} icon={faCashRegister} />
    ),
    link: "/transactionReport?userType=owner",
  },
];
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

export const ParkingOwnerDashbaord = (props) => {
  const [parkingLists, setParkingList] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);
  const [loader, setLoader] = useState(false);

  const handlerLoader = (status) => {
    setLoader(status);
  };

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

  useEffect(() => {
    handlerLoader(true);

    let payload = sessionStorage.getItem("payload");
    payload = JSON.parse(payload);

    getAllParkingLists(payload)
      .then((res) => {
        // console.log(res);
        handlerLoader(false);
        if (res.data.message === "Success") {
          let parkingArr = [];
          let parkingList = res.data.parking_list;
          if (parkingList.length <= 0) {
            toast("No Parking Available, Kindly Contact to admin.", {
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

          for (let i = 0; i <= parkingList.length - 1; i++) {
            let obj = {};
            obj["label"] = parkingList[i].name;
            obj["value"] = parkingList[i].parking_table_id;
            parkingArr.push(obj);
          }

          sessionStorage.setItem(
            "selectedParkingId",
            res.data.parking_list[0].parking_table_id
          );

          console.log(parkingList);

          setParkingList(parkingArr);
        } else {
          handlerLoader(false);

          toast("Error in Getting Parking List, Kindly Contact to admin.", {
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
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (parkingLists.length > 0) {
      sessionStorage.setItem(
        "selectedParking",
        JSON.stringify(parkingLists[0])
      );

      setSelectedParking(parkingLists[0]);
    }
  }, [parkingLists]);

  const handleParkingListChange = (e) => {
    console.log(e);
    sessionStorage.setItem("selectedParkingId", e.value);
    sessionStorage.setItem("selectedParking", JSON.stringify(e));
    setSelectedParking(e);
  };

  return (
    <div className={`primaryBgColor`}>
      <div className={`container ${styles.conCo}`}>
        <Header
          {...props}
          parkingLists={parkingLists}
          handleParkingListChange={handleParkingListChange}
          selectedParking={selectedParking}
        />
        {loader ? <Loader /> : <CardTile />}
      </div>
    </div>
  );
};

const Header = (props) => {
  const handleLogout = () => {
    sessionStorage.clear();
    props.history.push("/");
  };

  console.log(props.parkingLists);

  return (
    <div className="row sticky-top primaryBgColor">
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
          <div className="col-12 col-md-6 d-md-flex justify-content-center justify-content-md-start">
            <img
              src={WHITE_LOGO}
              alt="logo"
              className={`img-responsive d-none ${styles.logo}`}
            />
            <div className="pt-md-5">
              {props.parkingLists && (
                <select
                  class="form-select form-select-md mb-3"
                  aria-label=".form-select-lg example"
                  // className={styles.select}
                  defaultValue={props.selectedParking}
                  //   defaultInputValue={props.selectedParking.label}
                  onChange={props.handleParkingListChange}
                >
                  {props.parkingLists.map((item) => (
                    <option value={item.value}> {item.label}</option>
                  ))}
                </select>
              )}
            </div>
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
