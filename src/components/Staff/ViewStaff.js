import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEdit,
  faEye,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./AddStaff.module.css";

import { useHistory } from "react-router-dom";
import {
  getAllRangerReport,
  getAllRangerReportWithPageNo,
  handleLinkApi,
} from "../../util/service";
import { toast, ToastContainer } from "react-toastify";
import ReactToPrint from "react-to-print";
import { Loader } from "../Loader/Loader";
import { Pagination } from "react-bootstrap";

import _ from "lodash";
import DataTables from "datatables.net-dt";

export const ViewStaff = (props) => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  const handlerLoader = (status) => {
    setLoader(status);
  };
  useEffect(() => {
    handlerLoader(true);
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
    request.parking_table_id = sessionStorage.getItem("selectedParkingId");
    request.resident_token = societyId;
    // request.parking_table_id = payload.parking_table_id;
    // console.log(payload);
    getAllRangerReport(request)
      .then((res) => {
        setData(res.data);
        handlerLoader(false);
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
  }, []);

  const handleLink = (link) => {
    handlerLoader(true);
    handleLinkApi(link === "previous" ? data.links.previous : data.links.next)
      .then((res) => {
        setData(res.data);
        handlerLoader(false);
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

  const handlePage = (page) => {
    handlerLoader(true);
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
    request.parking_table_id = sessionStorage.getItem("selectedParkingId");
    request.resident_token = societyId;
    getAllRangerReportWithPageNo(request, page)
      .then((res) => {
        setData(res.data);
        handlerLoader(false);
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
        {loader ? (
          <Loader />
        ) : (
          <SocietyDetail
            payload={data}
            {...props}
            handleLink={handleLink}
            handlePage={handlePage}
          />
        )}
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
  const myRef = useRef();

  useEffect(() => {
    if (props.payload) {
      console.log(props.payload);
      setData(props.payload.results);
    }

    const table = $(myRef.current).DataTable({
      processing: true,
      serverSide: false,
      data: data, // Use the transformed data here
      paging: true,
      lengthChange: true, // Disable per-page length change
      pageLength: 10,
      // Set the initial page length
      searching: true, // Disable searching
      info: true,
      ordering: true,
      // handlePage: handlePage,
      // Disable sorting
    });

    // Set up the DataTable to reload data on pagination
    $(myRef.current).on("page.dt", () => {
      const currentPage = table.page.info().page + 1; // DataTables uses 0-based index
      props.handlePage(currentPage);
      // fetchData(currentPage, perPage);
    });
  }, [props.payload]);

  const handleSearch = (e) => {
    let arr = props.payload.results.filter(
      (item) =>
        item.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.phone_no.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(arr);
    if (arr.length > 0) {
      setData(arr);
    } else {
      setData(props.payload.results);
    }
  };

  const handleView = (item) => {
    item.title = "View  Staff Detail";
    item.backText = "View Staff";

    props.history.push({ pathname: "viewPopUp/", state: item });
  };

  const handleEdit = (item) => {
    props.history.push({ pathname: "/addStaff", state: item });
  };

  const handleDelete = (item) => {};

  const reactToPrintTrigger = React.useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <button
        type="submit"
        role={"presentation"}
        // onClick={handlePasswordReset}
        className={`${styles.loginButton}`}
      >
        <div
          className={`${styles.loginText} pointer mx-5 px-5 pb-2 mb-1 mt-1 pt-2`}
        >
          Print
        </div>
      </button>
    );
  }, []);

  const reactToPrintContent = React.useCallback(() => {
    console.log(myRef.current);
    return myRef.current;
  }, [myRef.current]);

  return (
    <div className="row">
      <div className="col-12 px-4 pt-4 pb-3">
        <div className={styles.title}>Staff Details </div>
      </div>

      <div className="col-12">
        <div className="row">
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Staff"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <ReactToPrint
                content={reactToPrintContent}
                documentTitle="Staff List"
                // onAfterPrint={handleAfterPrint}
                // onBeforeGetContent={handleOnBeforeGetContent}
                // onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
              />
            </div>
          </div>
        </div>
      </div>
      <StaffTable
        ref={myRef}
        data={data}
        // table={table}
        handleView={handleView}
        handleEdit={handleEdit}
      />
    </div>
  );
};

const StaffTable = React.forwardRef(({ data, handleView, handleEdit }, ref) => (
  <div className={`col-12 table-responsive px-4 `}>
    <table
      id="staffTable"
      ref={ref}
      className={`table table-striped pt-3 pb-4 `}
    >
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Ranger Id</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Mobile No</th>
          <th scope="col">Password</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.ranger_id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.phone_no}</td>
              <td>{item.password}</td>
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
));

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
