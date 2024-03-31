import React, { useEffect, useState } from "react";
import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./Controller.module.css";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import {
  createControllerApi,
  createSocietyGateApi,
  getAllSocietyGateApi,
  updateControllerApi,
  updateSocietyGateApi,
} from "../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const AddController = (props) => {
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
    payload.status = "ACTIVE";
    payload.resident_token = societyId;

    if (props.location && props.location.state) {
      payload.controller_id = props.location.state.id;

      updateControllerApi(payload)
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
      createControllerApi(payload)
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
              toast("Controller Created Succesfully", {
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
    let societyId = sessionStorage.getItem("societyToken");

    let request = {};
    request.access_token = payload.access_token;
    request.resident_token = societyId;
    getAllSocietyGateApi(request)
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
            Kindly fill below form for controller registeration
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Society Gate* </label>
            <select
              class="form-select form-select-lg"
              aria-label="Default select example"
              {...register("society_gate_id", {
                required: "Please select society gate",
              })}
            >
              <option value="">Select Society Gate</option>
              {data &&
                data.society_gates.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
            </select>
            {errors.society_gate_id && (
              <span className="errorText">
                {errors.society_gate_id.message}
              </span>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Name * </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              {...register("name", {
                required: "Please enter controller name",
              })}
            />
            {errors.name && (
              <span className="errorText">{errors.name.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Serial No* </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter gate description"
              {...register("serial_no", {
                required: "Please Controller Serial No",
              })}
            />
            {errors.serial_no && (
              <span className="errorText">{errors.serial_no.message}</span>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Vendor Name </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Vendor Name"
              {...register("vendor_name", {
                required: "Please Enter Vendor Name",
              })}
            />
            {errors.vendor_name && (
              <span className="errorText">{errors.vendor_name.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Vendor Id </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Vendor Id"
              {...register("vendor_id", {
                required: "Please enter vendor id",
              })}
            />
            {errors.vendor_id && (
              <span className="errorText">{errors.vendor_id.message}</span>
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
