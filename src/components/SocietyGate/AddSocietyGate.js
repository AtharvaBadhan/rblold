import React, { useEffect, useState } from "react";
import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./SocietyGate.module.css";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import { createSocietyGateApi, updateSocietyGateApi } from "../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const AddSocietyGate = (props) => {
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
      payload.society_gate_id = props.location.state.id;

      updateSocietyGateApi(payload)
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
              toast("Society Gate Updated Succesfully", {
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
      createSocietyGateApi(payload)
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
              toast("Society Gate Created Succesfully", {
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
            Kindly fill below form for society gate registeration
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
                required: "Please enter gate name",
              })}
            />
            {errors.name && (
              <span className="errorText">{errors.name.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Description* </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter gate description"
              {...register("description", {
                required: "Please enter gate description",
              })}
            />
            {errors.description && (
              <span className="errorText">{errors.description.message}</span>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Type* </label>
            <select
              class="form-select form-select-lg"
              aria-label="Default select example"
              {...register("type", {
                required: "Please select gate type",
              })}
            >
              <option value="">Select Gate Type</option>
              <option value="ENTRY">ENTRY</option>
              <option value="EXIT">EXIT</option>
              <option value="ENTRY/EXIT">ENTRY/EXIT</option>
            </select>
            {errors.type && (
              <span className="errorText">{errors.type.message}</span>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Address 1 </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter gate address 1"
              {...register("address_1", {
                required: "Please enter gate address 1",
              })}
            />
            {errors.address_1 && (
              <span className="errorText">{errors.address_1.message}</span>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 px-4">
          <div className={`${styles.formInput} form-group mb-3`}>
            <label> Address 2 </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter gate address 2"
              {...register("address_2", {
                required: "Please enter gate address 2",
              })}
            />
            {errors.address_2 && (
              <span className="errorText">{errors.address_2.message}</span>
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
