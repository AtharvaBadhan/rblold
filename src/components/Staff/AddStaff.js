import React, { useEffect, useState } from "react";
import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./AddStaff.module.css";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import {
  createStaffApi,
  getAllParkingLists,
  getRandomRangerId,
  updateStaffApi,
} from "../../util/service";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { Loader } from "../Loader/Loader";

export const AddStaff = (props) => {
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
  const [rangerId, setRangerId] = useState();
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
      setAccessToken(payload.access_token);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
  }, []);

  const onSubmit = (data) => {
    handlerLoader(true);
    console.log(data);
    let societyId = sessionStorage.getItem("societyToken");

    let payload = data;
    payload.access_token = accessToken;
    payload.status = "ACTIVE";
    payload.resident_token = societyId;
    if (!rangerId) {
      handlerLoader(false);
      toast("Ranger Id is missing, kindly contact admin.", {
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

    if (props.location && !props.location.state)
      if (!selectedParking) {
        handlerLoader(false);

        toast("Kindly Selected Parking.", {
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

    data["ranger_id"] =
      props.location && props.location.state
        ? props.location.state.ranger_id
        : rangerId;
    data["parking_table_id"] =
      props.location && props.location.state
        ? props.location.state.parking_table
        : selectedParking && selectedParking;
    data["access_token"] = accessToken;

    if (props.location && props.location.state) {
      payload.staff_id = props.location.state.id;

      updateStaffApi(payload)
        .then((res) => {
          handlerLoader(false);

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
            toast("Staff Updated Succesfully", {
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
          handlerLoader(false);

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
      createStaffApi(payload)
        .then((res) => {
          handlerLoader(false);

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
            toast("Staff Created Succesfully", {
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
          handlerLoader(false);

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

  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    payload = JSON.parse(payload);
    handlerLoader(true);
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
        handlerLoader(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let payload = sessionStorage.getItem("payload");
    handlerLoader(true);
    getRandomRangerId(JSON.parse(payload))
      .then((res) => {
        handlerLoader(false);
        console.log(res.data);
        setRangerId(res.data.value);
      })
      .catch((err) => {
        handlerLoader(false);
        console.log(err);
      });
  }, []);

  const handleParkingListChange = (e) => {
    setSelectedParking(e.target.value);
  };

  return (
    <>
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
      {loader ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={`mt-3`}>
          <div className="row">
            <div className="col-12 col-md-12 pb-3 pb-md-4 px-4 pt-5">
              <div className={`${styles.text1} primaryColor2`}>
                Kindly fill below form for staff registeration
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 px-4">
                <div className={`${styles.formInput} form-group mb-3`}>
                  <label> First Name * </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                    {...register("first_name", {
                      required: "Please enter first name",
                    })}
                  />
                  {errors.first_name && (
                    <span className="errorText">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 px-4">
                <div className={`${styles.formInput} form-group mb-3`}>
                  <label> Last Name * </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    {...register("last_name", {
                      required: "Please enter last name",
                    })}
                  />
                  {errors.last_name && (
                    <span className="errorText">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 px-4">
                <div className={`${styles.formInput} form-group mb-3`}>
                  <label> Ranger Id * </label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={true}
                    defaultValue={
                      props.location &&
                      props.location.state &&
                      props.location.state.ranger_id
                        ? props.location.state.ranger_id
                        : rangerId
                    }
                    placeholder="Enter Ranger Id"
                  />
                  {errors.ranger_id && (
                    <span className="errorText">
                      {errors.ranger_id.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 px-4">
                <div className={`${styles.formInput} form-group mb-3`}>
                  <label> Staff Designation </label>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    {...register("designation", {
                      required: "Please select staff designation",
                    })}
                  >
                    <option value="">Select Designation</option>
                    <option value="Ground">Ground Staff</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {errors.designation && (
                    <span className="errorText">
                      {errors.designation.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 px-4">
                <div className={`${styles.formInput} form-group mb-3`}>
                  <label> Mobile No * </label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={10}
                    placeholder="Enter Mobile No"
                    {...register("phone_no", {
                      required: "Please enter mobile no",
                    })}
                  />
                  {errors.phone_no && (
                    <span className="errorText">{errors.phone_no.message}</span>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 px-4">
                <div className={`${styles.formInput} form-group mb-3`}>
                  <label> Password * </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Please enter password",
                    })}
                  />
                  {errors.phone_no && (
                    <span className="errorText">{errors.phone_no.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 px-4">
                <div className={`${styles.formInput} form-group mb-3`}>
                  <label> Address * </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Address"
                    {...register("local_address", {
                      required: "Please enter address",
                    })}
                  />
                  {errors.local_address && (
                    <span className="errorText">
                      {errors.local_address.message}
                    </span>
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
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
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
      )}
    </>
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
