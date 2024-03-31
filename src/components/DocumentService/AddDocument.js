import React, { useEffect, useState } from "react";
import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./DocumentService.module.css";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import {
  addDocument,
  createExemptedVehicleApi,
  getAllParkingLists,
  updateDocument,
  updateExemptedVehicleApi,
} from "../../util/service";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { Loader } from "../Loader/Loader";

export const AddDocument = (props) => {
  return (
    <div className="primaryBgColor">
      <div className={`container  ${styles.conCo}`}>
        <Header />
        <Hr />
        <DocumentForm {...props} />
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

const DocumentForm = (props) => {
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

  const [serviceToken, setServiceToken] = useState();
  const [docTypeList, setDocTypeList] = useState([
    "Pan Card",
    "Aadhar Card",
    "Profile Photo",
    "Passport",
    "Driving License",
    "Voter ID",
    "Ration Card",
    "Electricity Bill",
    "Phone Bill",
    "Mobile Bill",
    "Agreement",
    "Certificate",
    "Others",
  ]);
  const [progress, setProgress] = useState(0);
  const [docType, setDocType] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let payload = sessionStorage.getItem("documentservice");
    if (!payload) {
      sessionStorage.clear();
      props.history.push("/documentservice");
      return;
    }
    try {
      payload = JSON.parse(payload);
      setServiceToken(payload.service_token_no);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/documentservice");
      return;
    }
  }, []);

  const handlerLoader = (status) => {
    setLoader(status);
  };

  const onSubmit = (data) => {
    console.log(data);
    let payload = data;
    payload.service_token_no = serviceToken;
    payload.status = "ACTIVE";
    handlerLoader(true);

    if (!docType) {
      toast("Select doctype", {
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
      handlerLoader(false);

      return;
    }

    payload["doc_type"] = docType;

    payload["document"] = payload.document[0];

    if (props.location && props.location.state) {
      payload.document_id = props.location.state.id;

      updateDocument(payload, setProgress)
        .then((res) => {
          handlerLoader(false);
          if (res.data.status !== "success") {
            toast(res.data.msg, {
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
            toast("Document Updated Succesfully", {
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
      console.log(progress);

      addDocument(payload, setProgress)
        .then((res) => {
          handlerLoader(false);
          if (res.data.status !== "success") {
            toast(res.data.msg, {
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
            toast("Document Created Succesfully", {
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
  const handleDocTypeChange = (e) => {
    console.log(e.target.value);
    setDocType(e.target.value);
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
      {loader ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-12 col-md-12 pb-3 pb-md-4 px-4 pt-5">
            <div className={`${styles.text1} primaryColor2`}>
              Kindly fill below form for document service
            </div>
          </div>

          <div className="col-12 col-md-6 px-4">
            <div className={`${styles.formInput} form-group mb-3`}>
              <label> Document Name * </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Document name"
                {...register("name", {
                  required: "Please enter document name",
                })}
              />
              {errors.name && (
                <span className="errorText">{errors.name.message}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6 px-4">
            <div className={`${styles.formInput} form-group mb-3`}>
              <label> DocType * </label>

              <select
                class="form-select form-select-md mb-3"
                aria-label=".form-select-lg example"
                // className={styles.select}
                // defaultValue={props.selectedParking}
                //   defaultInputValue={props.selectedParking.label}
                onChange={handleDocTypeChange}
              >
                <option value="">Select DocType</option>
                {docTypeList.map((item) => (
                  <option value={item}> {item}</option>
                ))}
              </select>

              {errors.doctype && (
                <span className="errorText">{errors.doctype.message}</span>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 px-4">
            <div className={`${styles.formInput} form-group mb-3`}>
              <label> Document * </label>
              <input
                type="file"
                className="form-control"
                placeholder="Select Document"
                {...register("document")}
              />
              {errors.document && (
                <span className="errorText">{errors.document.message}</span>
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

          <div className="row">
            <div className="pointer col-12 col-md-4 offset-md-4 pt-4 px-4">
              <button type="submit" className={styles.submitBtn}>
                <span className={styles.loginText}>Submit </span>
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
      )}
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
