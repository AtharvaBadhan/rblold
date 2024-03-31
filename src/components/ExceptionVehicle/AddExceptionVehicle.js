import React, { useEffect, useState } from "react";
import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./AddExceptionVehicle.module.css";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import {
  createExemptedVehicleApi,
  getAllParkingLists,
  updateExemptedVehicleApi,
} from "../../util/service";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

export const AddExceptionVehicle = (props) => {
  return (
    <div className="primaryBgColor">
      <div className={`container  ${styles.conCo}`}>
        <Header />
        <Hr />
        <ResidentForm {...props} />
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

const ResidentForm = (props) => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    defaultValues,
    reset,

    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: props.location && props.location.state,
  });

  const [accessToken, setAccessToken] = useState();
  const [parkingList, setParkingList] = useState();
  const [selectedParking, setSelectedParking] = useState();

  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    if (!payload) {
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    try {
      payload = JSON.parse(payload);
      setAccessToken(payload.access_token);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
  }, []);

  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    payload = JSON.parse(payload);

    getAllParkingLists(payload)
      .then((res) => {
        // console.log(res);
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

          // sessionStorage.setItem(
          //   "selectedParkingId",
          //   res.data.parking_list[0].parking_table_id
          // );

          setParkingList(parkingArr);
        } else {
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

  const onSubmit = (data) => {
    console.log(data);
    let payload = data;
    payload.access_token = accessToken;
    payload.status = "ACTIVE";

    payload["parking_table_id"] =
      props.location && props.location.state
        ? props.location.state.parking_table
        : selectedParking && selectedParking;

    if (props.location && props.location.state) {
      payload.vehicle_id = props.location.state.id;

      updateExemptedVehicleApi(payload)
        .then((res) => {
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
            toast("ExceptionVehicle Updated Succesfully", {
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

            setTimeout(() => history.goBack(), 1000);
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
    } else {
      createExemptedVehicleApi(payload)
        .then((res) => {
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
            toast("ExceptionVehicle Created Succesfully", {
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

            setTimeout(() => history.goBack(), 1000);
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

    // handleLogin(data);
  };

  console.log(errors);
  const resetForm = () => {
    reset({});
  };
  const handleParkingListChange = (e) => {
    console.log(e.target.value);
    setSelectedParking(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`mt-3`}>
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
      <div className="row">
        <div className="col-12 col-md-12 pb-3 pb-md-4 px-4 pt-5">
          <div className={`${styles.text1} primaryColor2`}>
            Kindly fill below form for exemption vehicle registeration
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Vehicle No * </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Vehicle No"
              {...register("vehicle_no", {
                required: "Please enter vehicle no",
              })}
            />
            {errors.vehicle_no && (
              <span className="errorText">{errors.vehicle_no.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Description * </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              {...register("description")}
            />
            {errors.description && (
              <span className="errorText">{errors.description.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Parking Name * </label>
            {/* <Select
              type="text"
              options={parkingList}
              // className="form-control"
              onChange={handleParkingListChange}
            /> */}
            {parkingList && (
              <select
                class="form-select form-select-md mb-3"
                aria-label=".form-select-lg example"
                // className={styles.select}
                // defaultValue={props.selectedParking}
                //   defaultInputValue={props.selectedParking.label}
                onChange={handleParkingListChange}
              >
                <option value="">Select Parking</option>
                {parkingList.map((item) => (
                  <option value={item.value}> {item.label}</option>
                ))}
              </select>
            )}
            {errors.parking_table_id && (
              <span className="errorText">
                {errors.parking_table_id.message}
              </span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="pointer col-12 col-md-4 offset-md-4 pt-4 px-4">
            <button type="submit" className={styles.submitBtn}>
              Submit{" "}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="pointer col-12 pb-5 col-md-4 offset-md-4 pt-4 px-4">
            <div onClick={resetForm} className={styles.resetBtn}>
              Reset{" "}
            </div>
          </div>
        </div>
      </div>
    </form>
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
