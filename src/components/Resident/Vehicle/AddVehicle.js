import React, { useEffect, useState } from "react";
import { WHITE_LOGO } from "../../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./VehiclePage.module.css";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import {
  createControllerApi,
  createSocietyGateApi,
  createVehicleApi,
  getAllResidentMemberApi,
  getAllSocietyGateApi,
  getFastagDetailAPI,
  updateControllerApi,
  updateSocietyGateApi,
  updateVehicleApi,
} from "../../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const AddVehicle = (props) => {
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
  const [data, setData] = useState();
  const [userType, setUserType] = useState();
  const [vehicleNo, setVehicleNo] = useState();
  const [epc, setEPC] = useState();

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
      let userType = sessionStorage.getItem("userType");
      setUserType(userType);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    let societyId = sessionStorage.getItem("societyToken");

    let payload = data;
    payload.access_token = accessToken;
    if (userType === "owner") {
      payload.society_member_id = "" + payload["society_member_id"];
    } else {
      let userId = sessionStorage.getItem("userId");

      payload.society_member_id = userId;
    }
    payload.status = "ACTIVE";
    payload.resident_token = societyId;

    let payloadd = sessionStorage.getItem("payload");
    if (!payloadd) {
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    try {
      payloadd = JSON.parse(payloadd);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    let request = {};
    request.access_token = payloadd.access_token;
    request.vehicle_no = payload.registration_no;

    getFastagDetailAPI(request).then((res) => {
      if (res.data.status == "success") {
        payload.epc_tag = res.data.payload.tagId;
        if (props.location && props.location.state) {
          payload.vehicle_id = props.location.state.id;

          updateVehicleApi(payload)
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
                if (res.data.message.status === 200) {
                  toast("Updated Updated Succesfully", {
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
                } else {
                  let errName =
                    res.data.message.errors[
                      Object.keys(res.data.message.errors)[0]
                    ][0];
                  console.log(errName);
                  toast(errName, {
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
        } else {
          createVehicleApi(payload)
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
                if (res.data.message.status === 201) {
                  toast("Vehicle Created Succesfully", {
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
                } else {
                  let errName =
                    res.data.message.errors[
                      Object.keys(res.data.message.errors)[0]
                    ][0];
                  console.log(errName);
                  toast(errName, {
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
        }
      } else {
        if (
          payload.epc_tag == null ||
          payload.epc_tag == undefined ||
          payload.epc_tag == "" ||
          payload.epc_tag == "NA"
        ) {
          payload.epc_tag = payload.registration_no;
        }
        if (props.location && props.location.state) {
          payload.vehicle_id = props.location.state.id;

          updateVehicleApi(payload)
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
                if (res.data.message.status === 200) {
                  toast("Updated Updated Succesfully", {
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
                } else {
                  let errName =
                    res.data.message.errors[
                      Object.keys(res.data.message.errors)[0]
                    ][0];
                  console.log(errName);
                  toast(errName, {
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
        } else {
          createVehicleApi(payload)
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
                if (res.data.message.status === 201) {
                  toast("Vehicle Created Succesfully", {
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
                } else {
                  let errName =
                    res.data.message.errors[
                      Object.keys(res.data.message.errors)[0]
                    ][0];
                  console.log(errName);
                  toast(errName, {
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
        }
      }
    });

    // handleLogin(data);
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
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    let request = {};
    let societyId = sessionStorage.getItem("societyToken");

    request.access_token = payload.access_token;
    request.resident_token = societyId;
    getAllResidentMemberApi(request)
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

  console.log(errors);
  const resetForm = () => {
    reset({});
  };

  const handleVehicleNoEntry = (e) => {
    setVehicleNo(e.target.value);
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
            Kindly fill below form for vehicle registration
          </div>
        </div>

        {userType === "owner" ? (
          <div className="col-12 col-md-6 px-4">
            <div className={`${styles.formInput} form-group mb-3`}>
              <label> Resident Member* </label>
              <select
                class="form-select form-select-lg"
                aria-label="Default select example"
                {...register("society_member_id", {
                  required: "Please select society member",
                })}
              >
                <option value="">Select Resident Member</option>
                {data &&
                  data.society_members.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
              </select>
              {errors.society_member_id && (
                <span className="errorText">
                  {errors.society_member_id.message}
                </span>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Brand * </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              {...register("brand", {
                required: "Please enter brand name",
              })}
            />
            {errors.brand && (
              <span className="errorText">{errors.brand.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Model* </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Model"
              {...register("model", {
                required: "Please Enter Model Name",
              })}
            />
            {errors.model && (
              <span className="errorText">{errors.model.message}</span>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label>Variant* </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Variant"
              {...register("variant", {
                required: "Please Enter Variant",
              })}
            />
            {errors.variant && (
              <span className="errorText">{errors.variant.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Vehicle Type* </label>
            <select
              class="form-select form-select-lg"
              aria-label="Default select example"
              {...register("type", {
                required: "Please select vehicle type",
              })}
            >
              <option value="">Select Vehicle Type</option>
              <option value="2 WHEELER">2 WHEELER</option>
              <option value="3 WHEELER">3 WHEELER</option>
              <option value="4 WHEELER">4 WHEELER</option>
              <option value="N WHEELER">N WHEELER</option>
            </select>

            {errors.type && (
              <span className="errorText">{errors.type.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Vehicle Number* </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Vehicle Type"
              {...register("registration_no", {
                required: "Please enter vehicle number",
              })}
            />
            {errors.registration_no && (
              <span className="errorText">
                {errors.registration_no.message}
              </span>
            )}
          </div>
        </div>
        {/* <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> EPC Fastag Id* </label>
            <input
              type="text"
              disabled={true}
              value={epc}
              className="form-control"
              placeholder="Enter EPC code of fastag"
              {...register("epc_tag", {
                required: "Please enter epc code of fastag",
              })}
            />
            {errors.epc_tag && (
              <span className="errorText">{errors.epc_tag.message}</span>
            )}
          </div>
        </div> */}
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
