import React, { useState, useEffect } from "react";

import { WHITE_LOGO } from "../../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEdit,
  faEye,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./VehiclePage.module.css";

import { useHistory } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import { societyWiseVehicleEntryExitAPI } from "../../../util/service";

import moment from "moment";

export const ViewEntryVehicle = (props) => {
  const [data, setData] = useState();
  const [filterDate, setFilterDate] = useState(moment.now());

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
    let userType = sessionStorage.getItem("userType");

    var formattedDate = moment(filterDate).format("YYYY-MM-DD");

    let request = {};
    request.access_token = payload.access_token;
    request.society_token_id = societyId;
    request.filterDate = formattedDate;
    request.vehicleEntryExitType = "ENTRY";
    request.userType = userType;

    societyWiseVehicleEntryExitAPI(request)
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
          setData(res.data.payload);
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
    let societyId = sessionStorage.getItem("societyToken");
    let userType = sessionStorage.getItem("userType");

    var formattedDate = moment(e.target.value).format("YYYY-MM-DD");
    let request = {};
    request.access_token = payload.access_token;
    request.society_token_id = societyId;
    request.filterDate = formattedDate;
    request.vehicleEntryExitType = "ENTRY";
    request.userType = userType;

    societyWiseVehicleEntryExitAPI(request)
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
          setData(res.data.payload);
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
      <div className={`container vh-100 ${styles.conCo}`}>
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
        <SocietyDetail
          payload={data}
          filterDate={filterDate}
          handleSearch={handleSearch}
          setFilterDate={setFilterDate}
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

const SocietyDetail = (props) => {
  let history = useHistory();
  const [data, setData] = useState();

  useEffect(() => {
    if (props.payload) {
      setData(props.payload);
    }
  }, [props.payload]);

  return (
    <div className="row">
      <div className="col-12 px-4 pt-4 pb-3">
        <div className={styles.title}>Vehicle Entry Details </div>
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

      <div className={`col-12 table-responsive px-4 ${styles.overScroll}`}>
        <table className={`table table-striped pt-3 pb-4 ${styles.myTable}`}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Vehicle No</th>
              <th scope="col">EPC TAG</th>
              <th scope="col">TYPE</th>
              <th scope="col">Timing</th>
              <th scope="col">User</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.registration_no}</td>
                  <td>{item.epc_tag}</td>
                  <td>{item.type}</td>
                  <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                  <td>{item.society_member && item.society_member.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
