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
import { getAllVehicleApi } from "../../../util/service";

export const ViewVehicle = (props) => {
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
    let userId = sessionStorage.getItem("userId");

    let request = {};
    request.access_token = payload.access_token;
    request.resident_token = societyId;
    request.userId = userId;

    getAllVehicleApi(request)
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
        <SocietyDetail payload={data} {...props} />
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
      setData(props.payload.vehicles);
    }
  }, [props.payload]);

  const handleSearch = (e) => {
    let arr = props.payload.vehicles.filter(
      (item) =>
        (item.brand &&
          item.brand.toLowerCase().includes(e.target.value.toLowerCase())) ||
        (item.registration_no &&
          item.registration_no
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        (item.epc_tag &&
          item.epc_tag.toLowerCase().includes(e.target.value.toLowerCase())) ||
        (item.model &&
          item.model.toLowerCase().includes(e.target.value.toLowerCase())) ||
        (item.variant &&
          item.variant.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    console.log(arr);
    if (arr.length > 0) {
      setData(arr);
    } else {
      setData(props.payload.vehicles);
    }
  };

  const handleView = (item) => {
    item.title = "View " + item.registration_no + " Vehicle Detail";
    item.backText = "View Vehicle";
    props.history.push({ pathname: "viewPopUp/", state: item });
  };

  const handleEdit = (item) => {
    props.history.push({ pathname: "/addVehicle", state: item });
  };

  const handleDelete = (item) => {};

  return (
    <div className="row">
      <div className="col-12 px-4 pt-4 pb-3">
        <div className={styles.title}>Vehicle Details </div>
      </div>

      <div className="col-12">
        <div className="row">
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Vehicle"
                onChange={handleSearch}
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
              <th scope="col">Member Id</th>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Variant</th>
              <th scope="col">Type</th>
              <th scope="col">Vehicle No</th>
              <th scope="col">EPC Tag</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.society_member && item.society_member.name}</td>
                  <td>{item.brand}</td>
                  <td>{item.model}</td>
                  <td>{item.variant}</td>
                  <td>{item.type}</td>
                  <td>{item.registration_no}</td>
                  <td>{item.epc_tag}</td>
                  <td>{item.status}</td>
                  <td>
                    <div className="d-flex">
                      <div className={styles.view}>
                        <FontAwesomeIcon
                          role={"presentation"}
                          onClick={() => handleView(item)}
                          //   color={"#ffffff"}
                          size="lg"
                          icon={faEye}
                        />
                      </div>
                      <div className={styles.edit}>
                        <FontAwesomeIcon
                          //   color={"#ffffff"}
                          role={"presentation"}
                          onClick={() => handleEdit(item)}
                          size="lg"
                          icon={faEdit}
                        />
                      </div>
                      {/* <div className={styles.delete}>
                        <FontAwesomeIcon
                          //   color={"#ffffff"}
                          size="lg"
                          role={"presentation"}
                          onClick={() => handleDelete(item)}
                          icon={faTrashAlt}
                        />
                      </div> */}
                    </div>
                  </td>
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
