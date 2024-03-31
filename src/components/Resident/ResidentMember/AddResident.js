import React, { useEffect, useState } from "react";
import { WHITE_LOGO } from "../../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./Resident.module.css";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import {
  createControllerApi,
  createSocietyGateApi,
  getAllSocietyGateApi,
  updateControllerApi,
  updateSocietyGateApi,
} from "../../../util/service";
import { toast, ToastContainer } from "react-toastify";
import {
  createResidentMemberApi,
  updateResidentMemberApi,
} from "../../../util/service";

export const AddResident = (props) => {
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

      if (
        data.fcm_token == null ||
        data.fcm_token == undefined ||
        data.fcm_token == ""
      ) {
        data.fcm_token = "NA";
      }

      updateResidentMemberApi(payload)
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
              toast("Resident Updated Successfully", {
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
      payload.fcm_token = "NA";
      createResidentMemberApi(payload)
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
              toast("Resident Created Successfully", {
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
            Kindly fill below form for resident member registration
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Member Type* </label>
            <select
              class="form-select form-select-lg"
              aria-label="Default select example"
              {...register("member_designation", {
                required: "Please select member designation",
              })}
            >
              <option value="">Select Member Designation</option>
              <option value="RESIDENT">RESIDENT</option>
              <option value="MANAGEMENT">MANAGEMENT</option>
              <option value="STAFF">STAFF</option>
            </select>
            {errors.member_designation && (
              <span className="errorText">
                {errors.member_designation.message}
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
                required: "Please enter name",
              })}
            />
            {errors.name && (
              <span className="errorText">{errors.name.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Mobile No* </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter mobile no"
              inputMode="numeric"
              maxLength="10"
              {...register("mobile_1", {
                required: "Please enter your mobile number",
                pattern: {
                  value: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, // eslint-disable-line no-useless-escape
                  message: "Please enter your valid phone number",
                },
                maxLength: {
                  value: 10,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.mobile_1 && (
              <span className="errorText">{errors.mobile_1.message}</span>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Alternate Mobile No* </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter alternate mobile no"
              inputMode="numeric"
              maxLength="10"
              {...register("mobile_2", {
                pattern: {
                  value: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, // eslint-disable-line no-useless-escape
                  message: "Please enter your valid alternate phone number",
                },
                maxLength: {
                  value: 10,
                  message: "Invalid alternate phone number",
                },
              })}
            />
            {errors.mobile_2 && (
              <span className="errorText">{errors.mobile_2.message}</span>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Email Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email Address"
              {...register("email_1", {
                required: "Please Enter email address",
              })}
            />
            {errors.email_1 && (
              <span className="errorText">{errors.email_1.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Flat No </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Flat No"
              {...register("flat_no", {
                required: "Please enter flat no",
              })}
            />
            {errors.flat_no && (
              <span className="errorText">{errors.flat_no.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Wing No</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Wing Detail"
              {...register("wing", {
                required: "Please enter wing detail",
              })}
            />
            {errors.wing && (
              <span className="errorText">{errors.wing.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label>Address 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address Detail"
              {...register("address_1", {
                required: "Please enter address",
              })}
            />
            {errors.address_1 && (
              <span className="errorText">{errors.address_1.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label>Address 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address 2 Detail"
              {...register("address_2", {
                required: "Please enter address 2 detail",
              })}
            />
            {errors.address_2 && (
              <span className="errorText">{errors.address_2.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label>Pincode</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address 2 Detail"
              {...register("pincode", {
                required: "Please enter pincode",
              })}
            />
            {errors.pincode && (
              <span className="errorText">{errors.pincode.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label>City</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter City Detail"
              {...register("city", {
                required: "Please enter city detail",
              })}
            />
            {errors.city && (
              <span className="errorText">{errors.city.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label>State</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter State Detail"
              {...register("state", {
                required: "Please enter state detail",
              })}
            />
            {errors.state && (
              <span className="errorText">{errors.state.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label>Country</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Country Detail"
              {...register("country", {
                required: "Please enter country detail",
              })}
            />
            {errors.country && (
              <span className="errorText">{errors.country.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label>FCM Token</label>
            <input
              type="text"
              disabled={true}
              className="form-control"
              placeholder="Enter FCM Token"
              {...register("fcm_token")}
            />
            {errors.fcm_token && (
              <span className="errorText">{errors.fcm_token.message}</span>
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
