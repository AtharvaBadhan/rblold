import React, { useEffect, useState } from "react";

import { WHITE_LOGO } from "../../../util/constants";

import * as styles from "./ANPRCamera.module.css";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  getAnprDetails,
  getAnprDetailsNextData,
  getAnprDetailsPreviousData,
} from "../../../util/service";
import { Loader } from "../../Loader/Loader";
import moment from "moment";
import { toast } from "react-toastify";
// import { style } from '@mui/system';

export const EntryANPRCamera = (props) => {
  const [anprData, setAnprData] = useState();
  const [loader, setLoader] = useState(false);
  const [filterDate, setFilterDate] = useState(moment.now());

  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    if (payload) {
      try {
        payload = JSON.parse(payload);
        if (payload.access_token) {
          let societyId = sessionStorage.getItem("societyToken");
          let userType = sessionStorage.getItem("userType");

          var formattedDate = moment(filterDate).format("DD-MM-YYYY");

          var payloa = {
            access_token: payload.access_token,
            filterDate: formattedDate,
            gateType: "ENTRY",
            resident_token: societyId,
          };
          setLoader(true);
          getAnprDetails(payloa)
            .then((res) => {
              setLoader(false);
              if (res.data.status === "success") {
                console.log(res.data);
                setAnprData(res.data);
              }
            })
            .catch((err) => {
              setLoader(false);

              console.log(err);
            });
        }
        // else {
        //   props.history.push("/login?userType=" + queryParams.userType);
        // }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  function handleNextData(url) {
    setLoader(true);
    let payload = sessionStorage.getItem("payload");
    if (payload) {
      try {
        payload = JSON.parse(payload);
        if (payload.access_token) {
          let societyId = sessionStorage.getItem("societyToken");
          let userType = sessionStorage.getItem("userType");

          var formattedDate = moment(filterDate).format("DD-MM-YYYY");

          var payloa = {
            access_token: payload.access_token,
            filterDate: formattedDate,
            gateType: "ENTRY",
            resident_token: societyId,
          };
          setLoader(true);
          getAnprDetailsNextData(url, payloa)
            .then((res) => {
              setLoader(false);
              console.log(res.data);
              setAnprData(res.data);
            })
            .catch((err) => {
              setLoader(false);

              console.log(err);
            });
        }
        // else {
        //   props.history.push("/login?userType=" + queryParams.userType);
        // }
      } catch (e) {
        console.log(e);
      }
    }
  }

  function handlePreviousData(url) {
    setLoader(true);

    let payload = sessionStorage.getItem("payload");
    if (payload) {
      try {
        payload = JSON.parse(payload);
        if (payload.access_token) {
          let societyId = sessionStorage.getItem("societyToken");
          let userType = sessionStorage.getItem("userType");

          var formattedDate = moment(filterDate).format("DD-MM-YYYY");

          var payloa = {
            access_token: payload.access_token,
            filterDate: formattedDate,
            gateType: "ENTRY",
            resident_token: societyId,
          };
          setLoader(true);
          getAnprDetailsPreviousData(url, payloa)
            .then((res) => {
              setLoader(false);
              console.log(res.data);
              setAnprData(res.data);
            })
            .catch((err) => {
              setLoader(false);

              console.log(err);
            });
        }
        // else {
        //   props.history.push("/login?userType=" + queryParams.userType);
        // }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const handleSearch = (e) => {
    setFilterDate(e.target.value);
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

    var formattedDate = moment(e.target.value).format("DD-MM-YYYY");
    let societyId = sessionStorage.getItem("societyToken");
    let userType = sessionStorage.getItem("userType");

    var payloa = {
      access_token: payload.access_token,
      filterDate: formattedDate,
      gateType: "ENTRY",
      resident_token: societyId,
    };
    getAnprDetails(payloa)
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
          setAnprData(res.data);
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
  };

  return (
    <div className="primaryBgColor">
      <div className="container vh-100">
        <Header />
        <Hr />

        <CameraDetails
          loader={loader}
          anprData={anprData}
          filterDate={filterDate}
          handleSearch={handleSearch}
          handleNextData={handleNextData}
          handlePreviousData={handlePreviousData}
          {...props}
        />
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

const CameraDetails = (props) => {
  return props.loader ? (
    <Loader />
  ) : (
    <div className={`row`}>
      <div className="col-12 px-4 pt-2 pb-3">
        <div className={styles.title}>Entry Camera (ANPR) Details</div>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <input
                type="date"
                value={moment(props.filterDate).format("YYYY-MM-DD")}
                className="form-control"
                placeholder="Search Vehicle"
                onChange={props.handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`row px-2 pt-2 pb-2 ${styles.Overall}`}>
        {props.anprData &&
          props.anprData.payload.results.map((item) => (
            <div
              className={`col-xl-4 col-md-4 col-lg-6 col-md-6 col-sm-12 px-3 pt-3 pb-3 ${styles.cardContainer}`}
            >
              <CardTile items={item} />
            </div>
          ))}
      </div>

      <div className="row justify-content-center">
        <div className="col-4 px-4 pt-2 pb-5">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() =>
                props.handlePreviousData(
                  props.anprData && props.anprData.payload.links.previous
                )
              }
              disabled={
                props.anprData && props.anprData.payload.links.previous === null
                  ? true
                  : false
              }
            >
              Previous
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() =>
                props.handleNextData(
                  props.anprData && props.anprData.payload.links.next
                )
              }
              disabled={
                props.anprData && props.anprData.payload.links.next === null
                  ? true
                  : false
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardTile = (props) => {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.vehicle}`}>
        <img
          className={`${styles.vehicle_image}`}
          src={`${props.items.vehicle_image}`}
          alt={props.items.vehicle_no}
        />
        <div className={`${styles.numberplate}`}>
          <img
            className={`${styles.numberplate_image}`}
            src={`${props.items.number_plate_image}`}
            alt={props.items.vehicle_no}
          />
        </div>
      </div>

      <div className="row card_text">
        <div className="row justify-content-start">
          <div className={`col-9 pt-2 px-4 ${styles.vehicleNumber}`}>
            Vehicle No : {props.items.vehicle_no}
          </div>
          <div className={`col-9 py-2 px-4 ${styles.vehicleNumber}`}>
            Timing :{" "}
            {moment(props.items.created_at).format("DD-MM-YYYY HH:MM:SS")}
          </div>

          {/* <div className={`col-1 pt-2 ${styles.view}`}>
            {" "}
            <FontAwesomeIcon icon={faEye} />
          </div> */}
          {/* <div className={`col-1 pt-2 ${styles.view}`}>
            {" "}
            <FontAwesomeIcon icon={faTrash} />
          </div> */}
        </div>

        <div className="row justify-content-start">
          <p className="col-6 px-4">Gate : {props.items.location} </p>
        </div>
      </div>
    </div>
  );
};
