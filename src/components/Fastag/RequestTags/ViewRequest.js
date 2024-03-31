import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WHITE_LOGO } from '../../../util/constants';
import { useHistory } from "react-router-dom";
import {
  faAngleLeft,
  faEdit,
  faEye,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";


import * as styles from "./request.module.css";

const ViewRequest = () => {
  return (
    <div className='primaryBgColor'>
      <div className={`container vh-100 ${styles.conCo}`}>
        <Header />
        <Hr />
        <RequestDetail />
      </div>
    </div>
  )
}









const RequestDetail = () => {
  return (
    //Title
    <div className='row'>
      <div className="col-12 col-md-9 px-4 pt-4 pb-3">
        <div className={styles.title}>Request Details </div>
      </div>

      <div className='pointer col-12 col-md-3 px-4 pt-1 pb-3'>
        <Link to="/RequestForm">
        <button className={styles.submitBtn}>
          +Add{" "}
        </button>
        </Link>
      </div>

    
      <div className={`col-12 table-responsive h-50 px-4 ${styles.overScroll}`}>
        <table className={`table table-striped pt-3 pb-4 ${styles.myTable}`}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TagId</th>
              <th scope="col">TId</th>
              <th scope="col">Vehicle No</th>
              <th scope="col">Notes</th>
              
            </tr>
          </thead>
          <tbody>
            {/* {data &&
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
                    {/* </div>
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
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


export default ViewRequest

