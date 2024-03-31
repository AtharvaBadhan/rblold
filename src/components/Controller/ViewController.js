import React, { useState, useEffect } from "react";

import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEdit,
  faEye,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./Controller.module.css";

import { useHistory } from "react-router-dom";
import {
  getAllControllerApi,
  getAllSocietyGateApi,
  getSingleSocietyDetailApi,
} from "../../util/service";
import { toast, ToastContainer } from "react-toastify";

export const ViewController = (props) => {
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
    getAllControllerApi(request)
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
      setData(props.payload.fastag_command_controls);
    }
  }, [props.payload]);

  const handleSearch = (e) => {
    let arr = props.payload.fastag_command_controls.filter(
      (item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.serial_no.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.vendor_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.vendor_id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(arr);
    if (arr.length > 0) {
      setData(arr);
    } else {
      setData(props.payload.fastag_command_controls);
    }
  };

  const handleView = (item) => {
    item.title = "View " + item.name + " Controller Detail";
    item.backText = "View Controller";
    props.history.push({ pathname: "viewPopUp/", state: item });
  };

  const handleEdit = (item) => {
    props.history.push({ pathname: "/addController", state: item });
  };

  const handleDelete = (item) => {};

  return (
    <div className="row">
      <div className="col-12 px-4 pt-4 pb-3">
        <div className={styles.title}>Controller Details </div>
      </div>

      <div className="col-12">
        <div className="row">
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Controller details"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`col-12 table-responsive h-50 px-4 ${styles.overScroll}`}>
        <table className={`table table-striped pt-3 pb-4 ${styles.myTable}`}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Serial No</th>
              <th scope="col">Society Gate Id</th>
              <th scope="col">Vendor Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.serial_no}</td>
                  <td>{item.society_gate_id}</td>
                  <td>{item.vendor_name}</td>
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
