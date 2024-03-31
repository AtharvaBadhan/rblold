import React from "react";

import * as styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center primaryBgColor vh-100">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
          <div className="col-12 pt-4 d-flex justify-content-center align-items-center">
            <div className={styles.loader}>Loading...</div>
          </div>
        </div>
      </div>
    </div>
  );
};
