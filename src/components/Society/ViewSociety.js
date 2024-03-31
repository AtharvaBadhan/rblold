import React, { useState, useEffect } from "react";

import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./ViewSociety.module.css";

import { useHistory } from "react-router-dom";
import { getSingleSocietyDetailApi } from "../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const ViewSociety = (props) => {
  const [data, setData] = useState();
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

    getSingleSocietyDetailApi(request)
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

  return (
    <div className="primaryBgColor">
      <div className={`container  ${styles.conCo}`}>
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
        <Header />
        <Hr />
        <SocietyDetail payload={data} />
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

const SocietyDetail = (props) => {
  let history = useHistory();
  return (
    <div className="row">
      <div className="col-12 px-4 pb-4 pt-3">
        <div className={styles.title}>Society Details</div>
      </div>
      <div className="col-6 px-4">
        <div className={styles.keyName}>Id</div>
      </div>

      <div className="col-6 px-4 ">
        <div className={styles.valueName}>
          {props.payload && props.payload.id}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>
      <div className="col-6 px-4">
        <div className={styles.keyName}>Name</div>
      </div>

      <div className="col-6 px-4">
        <div className={styles.valueName}>
          {props.payload && props.payload.name}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>
      <div className="col-6 px-4">
        <div className={styles.keyName}>Address</div>
      </div>

      <div className="col-6 px-4">
        <div className={styles.valueName}>
          {props.payload && props.payload.address_1}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>
      <div className="col-6 px-4">
        <div className={styles.keyName}>City</div>
      </div>

      <div className="col-6 px-4">
        <div className={styles.valueName}>
          {props.payload && props.payload.city}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>
      <div className="col-6 px-4">
        <div className={styles.keyName}>State</div>
      </div>

      <div className="col-6 px-4">
        <div className={styles.valueName}>
          {props.payload && props.payload.state}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>
      <div className="col-6 px-4">
        <div className={styles.keyName}>Total Resident Count</div>
      </div>

      <div className="col-6 px-4">
        <div className={styles.valueName}>
          {props.payload && props.payload.total_resident_count}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>
      <div className="col-6 px-4">
        <div className={styles.keyName}>Total Entry Gate</div>
      </div>

      <div className="col-6 px-4">
        <div className={styles.valueName}>
          {props.payload && props.payload.total_entry_count}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>
      <div className="col-6 px-4">
        <div className={styles.keyName}>Total Exit Gate</div>
      </div>

      <div className="col-6 px-4">
        <div className={styles.valueName}>
          {props.payload && props.payload.total_exit_count}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>

      <div className="col-6 px-4">
        <div className={styles.keyName}>Status</div>
      </div>

      <div className="col-6 px-4">
        <div className={styles.valueName}>
          {props.payload && props.payload.status}
        </div>
      </div>
      <div className="col-12">
        <Hr />
      </div>

      <div className="col-12 pb-5 d-flex pointer justify-content-center pt-3 pb-3">
        <div
          role={"presentation"}
          onClick={() => history.goBack()}
          className={styles.resetBtn}
        >
          back
        </div>
      </div>
    </div>
  );
};

// const ResidentForm = (props) => {
//   return (
//     <form>
//       <div className="row">
//         <div className="col-12 col-md-12 pb-3 pb-md-4 px-4 pt-5">
//           <div className={`${styles.text1} primaryColor2`}>
//             Kindly fill below form for resident registeration
//           </div>
//         </div>

//         <div className="col-12 col-md-6 px-4">
//           <div className={`${styles.formInput} form-group mb-3`}>
//             <label> Name * </label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Name"

//               // aria-label="mobileNo"
//               // aria-describedby="basic-addon1"
//             />
//           </div>
//         </div>
//         <div className="col-12 col-md-6 px-4">
//           <div className={`${styles.formInput} form-group mb-3`}>
//             <label> Mobile No * </label>
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Enter Mobile No"
//               inputMode="numeric"
//               maxLength="10"

//               // aria-label="mobileNo"
//               // aria-describedby="basic-addon1"
//             />
//           </div>
//         </div>

//         <div className="col-12 col-md-6 px-4">
//           <div className={`${styles.formInput} form-group mb-3`}>
//             <label> Email Address </label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter Email Address"

//               // aria-label="mobileNo"
//               // aria-describedby="basic-addon1"
//             />
//           </div>
//         </div>

//         <div className="col-12 col-md-6 px-4">
//           <div className={`${styles.formInput} form-group mb-3`}>
//             <label> Resident Id* </label>
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Enter Resident Id"

//               // aria-label="mobileNo"
//               // aria-describedby="basic-addon1"
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="pointer col-12 col-md-4 offset-md-4 pt-4 px-4">
//             <div className={styles.submitBtn}>Submit </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="pointer col-12 pb-5 col-md-4 offset-md-4 pt-4 px-4">
//             <div className={styles.resetBtn}>Reset </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

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
