import React, { useState, useEffect, useRef } from "react";

import { WHITE_LOGO } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEdit,
  faEye,
  faFileDownload,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./DocumentService.module.css";

import { Link, useHistory } from "react-router-dom";
import {
  deleteDocument,
  deleteExemptedVehicle,
  getAllExemptedVehicleListApi,
  getAllResidentMemberApi,
  viewDocument,
} from "../../util/service";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../Loader/Loader";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";

export const ViewDocument = (props) => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  const handlerLoader = (status) => {
    setLoader(status);
  };
  useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = () => {
    handlerLoader(true);

    let payload = sessionStorage.getItem("documentservice");
    if (!payload) {
      sessionStorage.clear();
      props.history.push("/documentservice");
      return;
    }
    try {
      payload = JSON.parse(payload);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/documentservice");
      return;
    }
    let request = {};
    request.service_token_no = payload.service_token_no;
    viewDocument(request)
      .then((res) => {
        if (res.data.status === "success") {
          setData(res.data.payload);
        } else {
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
        }
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
  };

  const handleDelete = (documentId) => {
    handlerLoader(true);

    let payload = sessionStorage.getItem("documentservice");
    if (!payload) {
      sessionStorage.clear();
      props.history.push("/documentservice");
      return;
    }
    try {
      payload = JSON.parse(payload);
    } catch (e) {
      console.log("exception occur", e);
      sessionStorage.clear();
      props.history.push("/documentservice");
      return;
    }
    let request = {};
    request.service_token_no = payload.service_token_no;
    request.document_id = documentId;
    deleteDocument(request)
      .then((res) => {
        console.log(res.data);
        handlerLoader(false);
        if (res.data.status === "success") {
          toast("Document Deleted Successfully", {
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
          getAllDocuments();
        } else {
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
        }
        // setData(res.data);
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
            handleDelete={handleDelete}
            payload={data}
            {...props}
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
      setData(props.payload);
    }
  }, [props.payload]);

  const handleSearch = (e) => {
    let arr = props.payload.filter(
      (item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.doctype.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(arr);
    if (arr.length > 0) {
      setData(arr);
    } else {
      setData(props.payload);
    }
  };

  const handleView = (item) => {
    item.title = "View Document Details";
    item.backText = "View Document";
    item.qrCode = item.document;

    props.history.push({ pathname: "viewDocumentPopUp/", state: item });
  };

  const handleEdit = (item) => {
    props.history.push({ pathname: "/addDocument", state: item });
  };

  const handleAddDocument = () => {
    props.history.push({ pathname: "/addDocument" });
  };

  return (
    <div className="row">
      <div className="col-12 px-4 pt-4 pb-3">
        <div className={styles.title}>Document Details </div>
      </div>

      <div className="col-12">
        <div className="row">
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <input
                type="text"
                className="form-control"
                placeholder="Search document"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="col-12 px-4 pb-4 col-md-5">
            <div className={`${styles.formInput} form-group mb-3`}>
              <button
                // type="submit"
                role={"presentation"}
                onClick={handleAddDocument}
                className={`${styles.loginButton}`}
              >
                <div
                  className={`${styles.loginText} pointer mx-5 px-5 pb-2 mb-1 mt-1 pt-2`}
                >
                  Add Document
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <StaffTable
        ref={myRef}
        data={data}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={props.handleDelete}
      />
    </div>
  );
};

const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

const StaffTable = React.forwardRef(
  ({ data, handleView, handleEdit, handleDelete }, ref) => (
    <div className={`col-12 table-responsive  px-4 ${styles.overScroll}`}>
      <table
        ref={ref}
        className={`table table-striped pt-3 pb-4 ${styles.myTable}`}
      >
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">DocType</th>
            <th scope="col">Description</th>
            <th scope="col">Document</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.doctype}</td>
                <td>{item.description}</td>
                <td onClick={() => openInNewTab(item.document)}>
                  <FontAwesomeIcon
                    role={"presentation"}
                    // onClick={() => handleView(item)}
                    //   color={"#ffffff"}
                    size="lg"
                    icon={faFileDownload}
                  />
                </td>

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
                    <div className={styles.delete}>
                      <FontAwesomeIcon
                        //   color={"#ffffff"}
                        size="lg"
                        role={"presentation"}
                        onClick={() => handleDelete(item.id)}
                        icon={faTrashAlt}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
);

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
    </div>
  );
};
