import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { WHITE_LOGO } from "../../util/constants";

import * as styles from "./fastag.module.css";

const Fastag = () => {
  

  const listOfCard =[
    {
      name:"RequestTags",
      link:"/viewRequest",  // Have to add Request Form with Button(+Add)
    },

    {
      name:"SyncTime",
      link:"/syncTime",
    },

    {
      name:"RequestPay",
      link:"/requestPay",
    },

    {
      name:"TransactionStatus",
      link:"/transactionStatus",
    },

    {
      name:"ExceptionList",
      link:"/exceptionList",
    },

    {
      name:"QueryException",
      link:"/queryException",
    },


  ];

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

  return (
    <div className={`primaryBgColor`}>
      <div className={`container ${styles.conCo}`}>
        <Header />
        <Hr />

        <div className="row justify-content-center align-items-center">
          {listOfCard.map((e) => (
            <div className="col-md-4 col-lg-4 col-12 px-4 pb-4 pt-4">
              <Link className="noDecoration" to={e.link}>
              <div className={styles.cardContainer}>
                <div className={styles.text}>{e.name}</div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fastag;
