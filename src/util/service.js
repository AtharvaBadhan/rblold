import axios from "axios";
import { toast } from "react-toastify";

export const ENDPOINTS = {
  BASE_URL: "https://server.parkadda.com/",

  // BASE_URL: "http://localhost:8000/",
  LOGIN_URL: "api/resident/residentLogin",
  VERIFY_OTP: "api/resident/residentVerifyOtp",
  RESEND_OTP: "api/resident/residentResendOtp",
  FORGOT_PASSWORD: "api/resident/residentForgotPassword",
  RESET_PASSWORD: "api/resident/residentResetPassword",
  GET_SOCIETY_DETAIL: "api/resident/getResidentSocietyDetailsById",
  CREATE_SOCIETY_GATE: "api/resident/createResidentSocietyGate",
  UPDATE_SOCIETY_GATE: "api/resident/updateResidentSocietyGate",
  GET_ALL_SOCIETY_GATE: "api/resident/getResidentSocietyGatesDetailsById",
  DELETE_SOCIETY_GATE: "api/resident/deleteResidentSocietyGate",
  CREATE_CONTROLLER: "api/resident/createResidentController",
  UPDATE_CONTROLLER: "api/resident/updateResidentController",
  GET_ALL_CONTROLLER: "api/resident/getControllerDetails",
  DELETE_CONTROLLER: "api/resident/deleteResidentController",
  CREATE_RESIDENT_MEMBER: "api/resident/createResidentMember",
  UPDATE_RESIDENT_MEMBER: "api/resident/updateResidentMember",
  GET_ALL_RESIDENT_MEMBER: "api/resident/getResidentMemberDetails",
  DELETE_RESIDENT_MEMBER: "api/resident/deleteResidentMember",
  CREATE_VEHICLE: "api/resident/createResidentVehicle",
  UPDATE_VEHICLE: "api/resident/updateResidentVehicle",
  GET_ALL_VEHICLE: "api/resident/getResidentVehicleDetails",
  DELETE_VEHICLE: "api/resident/deleteResidentVehicle",
  GET_SINGLE_GATE_DETAILS: "api/resident/getResidentSingleGate",
  GET_SINGLE_CONTROLLER: "api/resident/getResidentSingleController",
  GET_SINGLE_MEMBER_RESIDENT: "api/resident/getResidentSingleMember",
  GET_SINGLE_VEHICLE: "api/resident/getResidentSingleVehicle",
  GET_SINGLE_SOCIETY: "api/resident/getResidentSingleSociety",
  RESIDENT_SIGNUP: "api/resident/residentSignUp",
  GET_ALL_PARKING_LIST: "api/host/listings",
  CREATE_STAFF: "api/ranger/handleRangerData/",
  UPDATE_STAFF: "api/ranger/handleRangerData/",
  DELETE_STAFF: "api/ranger/deleteRangerById",
  GET_RANDOM_STAFF_ID: "api/ranger/getRangerId",
  GET_ALL_STAFF: "api/ranger/getAllRanger",
  CREATE_EXEMPTED_VEHICLE: "api/ranger/handleExemptedVehicle/",
  UPDATE_EXEMPTED_VEHICLE: "api/ranger/handleExemptedVehicle/",
  DELETE_EXEMPTED_VEHICLE: "api/ranger/deleteExemptedVehicleById/",
  GET_ALL_EXEMPTED_VEHICLE: "api/ranger/getAllExemptedVehicleList/",
  GET_ALL_CONTROLLER_DETAILS: "api/ranger/getAllControllerHeartBeatDetails/",
  GET_ALL_VEHICLE_IN_REPORT: "api/ranger/getAllVehicleInReport/",
  GET_ALL_VEHICLE_OUT_REPORT: "api/ranger/getAllVehicleOutReport/",
  GET_ALL_VEHICLE_IN_OUT_REPORT: "api/ranger/getAllVehicleInOutReport/",
  GET_ALL_FASTAG_TRANSACTION_REPORT: "api/ranger/getFastagTransactionReport/",
  GET_ALL_TRANSACTION_REPORT: "api/ranger/getTransactionReport/",
  GET_RANGER_REPORT: "api/ranger/rangerReport",
  ADD_DOCUMENT: "api/documentservice/addDocument/",
  UPDATE_DOCUMENT: "api/documentservice/updateDocument/",
  DELETE_DOCUMENT: "api/documentservice/deleteDocument/",
  GET_ALL_DOCUMENTS: "api/documentservice/getAllDocuments/",
  VALIDATE_ADMIN_SERVICE_TOKEN_NO:
    "api/documentservice/validateDocumentServiceTokenNo/",
  GET_ANPR_DETAILS: "api/resident/residentAnprDetails",
  VERIFY_SOCIETY_TOKEN: "api/resident/verifyResidentToken",
  VEHICLE_IN_OUT: "api/resident/societyWiseVehicleEntryExit",
  GET_RESIDENT_MEMBER_DETAILS_BY_MOBILE_NO:
    "api/resident/getResidentMemberDetailsByMobileNo",
  GET_FASTAG_DETAIL: "api/resident/getFastagDetails",
};

export const loginApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.LOGIN_URL, payload, {
    header: header,
  });
};

export const verifySocietyTokenApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.VERIFY_SOCIETY_TOKEN,
    payload,
    {
      header: header,
    }
  );
};

export const getAnprDetails = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.GET_ANPR_DETAILS, payload, {
    header: header,
  });
};

export const getFastagDetailAPI = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.GET_FASTAG_DETAIL, payload, {
    header: header,
  });
};

export const getResidentMemberDetailsByMobileNoAPI = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_RESIDENT_MEMBER_DETAILS_BY_MOBILE_NO,
    payload,
    {
      header: header,
    }
  );
};

export const getAnprDetailsNextData = (url, payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(url, payload, {
    header: header,
  });
};

export const getAnprDetailsPreviousData = (url, payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(url, payload, {
    header: header,
  });
};

export const signUpApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.RESIDENT_SIGNUP, payload, {
    header: header,
  });
};

export const verifyOtpApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.VERIFY_OTP, payload, {
    header: header,
  });
};

export const resendOtpApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.RESEND_OTP, payload, {
    header: header,
  });
};

export const forGotPasswordApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.FORGOT_PASSWORD, payload, {
    header: header,
  });
};

export const societyWiseVehicleEntryExitAPI = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.VEHICLE_IN_OUT, payload, {
    header: header,
  });
};

export const resetPasswordApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.RESET_PASSWORD, payload, {
    header: header,
  });
};

export const getAllParkingLists = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.get(ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_PARKING_LIST, {
    header: header,
    params: {
      access_token: payload.access_token,
    },
  });
};

export const deleteExemptedVehicle = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.get(ENDPOINTS.BASE_URL + ENDPOINTS.DELETE_EXEMPTED_VEHICLE, {
    header: header,
    params: {
      access_token: payload.access_token,
      vehicle_id: payload.vehicle_id,
    },
  });
};

export const getAllRangerReport = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };
  console.log(payload);

  return axios.get(
    ENDPOINTS.BASE_URL +
      ENDPOINTS.GET_RANGER_REPORT +
      "/" +
      payload.access_token +
      "/" +
      payload.parking_table_id +
      "?limit=10",
    {
      header: header,
      // params: {
      //   access_token: payload.access_token,
      // },
    }
  );
};

export const getAllRangerReportWithPageNo = (payload, pageNo) => {
  const header = {
    "Content-Type": "application/json",
  };
  console.log(payload);

  return axios.get(
    ENDPOINTS.BASE_URL +
      ENDPOINTS.GET_RANGER_REPORT +
      "/" +
      payload.access_token +
      "/" +
      payload.parking_table_id +
      "?limit=10&page=" +
      pageNo,
    {
      header: header,
      // params: {
      //   access_token: payload.access_token,
      // },
    }
  );
};

export const handleLinkApi = (link) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.get(link, {
    header: header,
    // params: {
    //   access_token: payload.access_token,
    // },
  });
};

export const getSocietyDetailApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SOCIETY_DETAIL,
    payload,
    {
      header: header,
    }
  );
};

export const createSocietyGateApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.CREATE_SOCIETY_GATE,
    payload,
    {
      header: header,
    }
  );
};

export const updateSocietyGateApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_SOCIETY_GATE,
    payload,
    {
      header: header,
    }
  );
};

export const getAllSocietyGateApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_SOCIETY_GATE,
    payload,
    {
      header: header,
    }
  );
};
export const deleteSocietyGateApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.DELETE_SOCIETY_GATE,
    payload,
    {
      header: header,
    }
  );
};

export const createControllerApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.CREATE_CONTROLLER, payload, {
    header: header,
  });
};

export const updateControllerApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_CONTROLLER, payload, {
    header: header,
  });
};

export const getAllControllerApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_CONTROLLER,
    payload,
    {
      header: header,
    }
  );
};
export const deleteControllerApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.DELETE_CONTROLLER, payload, {
    header: header,
  });
};

export const createResidentMemberApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.CREATE_RESIDENT_MEMBER,
    payload,
    {
      header: header,
    }
  );
};

export const updateResidentMemberApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_RESIDENT_MEMBER,
    payload,
    {
      header: header,
    }
  );
};

export const getAllResidentMemberApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_RESIDENT_MEMBER,
    payload,
    {
      header: header,
    }
  );
};
export const deleteResidentMemberApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.DELETE_RESIDENT_MEMBER,
    payload,
    {
      header: header,
    }
  );
};

export const createVehicleApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.CREATE_VEHICLE, payload, {
    header: header,
  });
};

export const updateVehicleApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_VEHICLE, payload, {
    header: header,
  });
};

export const getAllVehicleApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_VEHICLE, payload, {
    header: header,
  });
};
export const deleteVehicleApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.DELETE_VEHICLE, payload, {
    header: header,
  });
};

export const getSingleSocietyDetailApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_SOCIETY,
    payload,
    {
      header: header,
    }
  );
};

export const getSingleSocietyGateDetailApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_GATE_DETAILS,
    payload,
    {
      header: header,
    }
  );
};

export const getSingleResidentMemberDetailApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_MEMBER_RESIDENT,
    payload,
    {
      header: header,
    }
  );
};

export const getSingleVehicleDetailApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_VEHICLE,
    payload,
    {
      header: header,
    }
  );
};

export const getSingleControllerApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_CONTROLLER,
    payload,
    {
      header: header,
    }
  );
};

export const createStaffApi = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.CREATE_STAFF, form_data, {
    // header: header,
  });
};

export const updateStaffApi = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_STAFF, form_data, {
    // header: header,
  });
};

export const createExemptedVehicleApi = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.CREATE_EXEMPTED_VEHICLE,
    form_data,
    {
      // header: header,
    }
  );
};

export const updateExemptedVehicleApi = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  console.log(payload);

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_EXEMPTED_VEHICLE,
    form_data,
    {
      // header: header,
    }
  );
};

export const getAllVehicleInReport = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_VEHICLE_IN_REPORT,
    form_data,
    {
      // header: header,
    }
  );
};

export const getAllVehicleOutReport = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_VEHICLE_OUT_REPORT,
    form_data,
    {
      // header: header,
    }
  );
};

export const getAllVehicleInOutReport = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_VEHICLE_IN_OUT_REPORT,
    form_data,
    {
      // header: header,
    }
  );
};

export const getAllFastagTransactionReport = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_FASTAG_TRANSACTION_REPORT,
    form_data,
    {
      // header: header,
    }
  );
};

export const getAllTransactionReport = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_TRANSACTION_REPORT,
    form_data,
    {
      // header: header,
    }
  );
};

export const deleteExemptedVehicleApi = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  return axios.get(
    ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_EXEMPTED_VEHICLE,

    {
      // header: header,
      params: {
        access_token: payload.access_token,
        vehicle_id: payload.vehicle_id,
      },
    }
  );
};

export const getAllExemptedVehicleListApi = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  return axios.get(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_EXEMPTED_VEHICLE,

    {
      // header: header,
      params: {
        access_token: payload.access_token,
      },
    }
  );
};

export const deleteStaffApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_CONTROLLER,
    payload,
    {
      header: header,
    }
  );
};

export const createExceptionVehicleApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_CONTROLLER,
    payload,
    {
      header: header,
    }
  );
};

export const updateExceptionVehicleApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_CONTROLLER,
    payload,
    {
      header: header,
    }
  );
};

export const deleteExceptionVehicleApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_CONTROLLER,
    payload,
    {
      header: header,
    }
  );
};

export const getTransactionReportApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_SINGLE_CONTROLLER,
    payload,
    {
      header: header,
    }
  );
};

export const getAllStaffApi = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.get(ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_STAFF, {
    header: header,
    params: {
      access_token: payload.access_token,
    },
  });
};

export const getRandomRangerId = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.get(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_RANDOM_STAFF_ID,

    {
      header: header,
      params: {
        access_token: payload.access_token,
      },
    }
  );
};

export const getAllControllerHeartBeatDetails = (payload) => {
  const header = {
    "Content-Type": "application/json",
  };

  return axios.get(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_CONTROLLER_DETAILS,

    {
      header: header,
      params: {
        access_token: payload.access_token,
        parking_table_id: payload.parking_table_id,
      },
    }
  );
};

export const addDocument = (payload, setProgress) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.ADD_DOCUMENT, form_data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 86400,

    // withCredentials: true,
    onUploadProgress: (data) => {
      //Set the progress value to show the progress bar
      // setProgress();
      // console.log(Math.round((100 * data.loaded) / data.total));
      // toast("Document Uploading, please wait", {
      //   position: "top-right",
      //   autoClose: false,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: false,
      //   draggable: true,
      //   type: "warning",
      //   theme: "colored",
      //   progress: Math.round((100 * data.loaded) / data.total),
      // });
    },
  });
};

export const viewDocument = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.GET_ALL_DOCUMENTS,
    form_data,
    {
      // header: header,
    }
  );
};

export const deleteDocument = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.DELETE_DOCUMENT, form_data, {
    // header: header,
  });
};

export const validateServiceTokenNo = (payload) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(
    ENDPOINTS.BASE_URL + ENDPOINTS.VALIDATE_ADMIN_SERVICE_TOKEN_NO,
    form_data,
    {
      // header: header,
    }
  );
};

export const updateDocument = (payload, setProgress) => {
  // const header = {
  //   "Content-Type": "application/json",
  // };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  return axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_DOCUMENT, form_data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 86400,
    // withCredentials: true,
    onUploadProgress: (data) => {
      //Set the progress value to show the progress bar
      // toast("Document Uploading, please wait", {
      //   position: "top-right",
      //   autoClose: false,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: false,
      //   draggable: true,
      //   type: "warning",
      //   theme: "colored",
      //   progress: Math.round((100 * data.loaded) / data.total),
      // });
    },
  });
};
