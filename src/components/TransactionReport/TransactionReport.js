import React, { useState, useEffect, useRef } from "react";

import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEdit,
  faEye,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./TransactionReport.module.css";

import { useHistory } from "react-router-dom";
import { getAllTransactionReport } from "../../util/service";
import { toast, ToastContainer } from "react-toastify";
import ReactToPrint from "react-to-print";
import { Loader } from "../Loader/Loader";

export const TransactionReport = (props) => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  const handlerLoader = (status) => {
    setLoader(status);
  };
  useEffect(() => {
    handlerLoader(true);

    let payload = sessionStorage.getItem("payload");
    let selectedParkingId = null;
    if (!payload) {
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    try {
      payload = JSON.parse(payload);
      selectedParkingId = sessionStorage.getItem("selectedParkingId");
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/");
      return;
    }
    let request = {};
    request.access_token = payload.access_token;
    request.parking_table_id = selectedParkingId && selectedParkingId;
    getAllTransactionReport(request)
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
        {loader ? <Loader /> : <SocietyDetail payload={data} {...props} />}
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
      setData(props.payload);
    }
  }, [props.payload]);

  const handleSearch = (e) => {
    let arr = props.payload.filter(
      (item) =>
        item.ranger_first_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.ranger_last_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.VRNumber.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.vehicle_type.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(arr);
    if (arr.length > 0) {
      setData(arr);
    } else {
      setData(props.payload.society_gates);
    }
  };

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
        <div className={styles.title}>Transaction Details </div>
      </div>

      <div className="col-12">
        <div className="row">
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Transaction"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <ReactToPrint
                content={reactToPrintContent}
                documentTitle="Transaction List"
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
      <StaffTable ref={myRef} data={data} />
    </div>
  );
};

const StaffTable = React.forwardRef(({ data, handleView, handleEdit }, ref) => (
  <div className={`col-12 table-responsive px-4 ${styles.overScroll}`}>
    <table
      ref={ref}
      className={`table table-striped pt-3 pb-4 ${styles.myTable}`}
    >
      <thead>
        <tr>
          <th scope="col">Booking Id</th>
          <th scope="col">Vehicle No</th>
          <th scope="col">EPC Tag Id</th>
          <th scope="col">Vehicle Type</th>
          <th scope="col">Staff Name</th>
          <th scope="col">Entry Time</th>
          <th scope="col">Exit Time</th>
          <th scope="col">Payment amount</th>
          <th scope="col">Payment Description</th>
          <th scope="col">Payment Type</th>
          <th scope="col">Transaction ID</th>
          <th scope="col">Transaction Status</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr>
              <td>{item.booking_id}</td>
              <td>{item.VRNumber}</td>
              <td>{item.tagId}</td>
              <td>{item.vehicle_type}</td>
              <td>{item.ranger_first_name}</td>
              <td>{item.entry_time}</td>
              <td>{item.exit_time}</td>
              <td>{item.payment_amount}</td>
              <td>{item.payment_description}</td>
              <td>{item.payment_type}</td>
              <td>{item.transaction_id}</td>
              <td>{item.transaction_status}</td>
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
