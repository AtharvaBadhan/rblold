import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AddController } from "../components/Controller/AddController";
import { ViewController } from "../components/Controller/ViewController";
import Fastag from "../components/Fastag/Fastag";
import { Heartbeat } from "../components/Heartbeat/Heartbeat";
import { Loader } from "../components/Loader/Loader";
import { NotFound } from "../components/NotFound/NotFound";

import RequestTags from "../components/Fastag/RequestTags/RequestTags";
import ViewRequest from "../components/Fastag/RequestTags/ViewRequest";
import SyncTime from "../components/Fastag/SyncTime/SyncTime";
import AddSyncTime from "../components/Fastag/SyncTime/AddSynctime";
import RequestPay from "../components/Fastag/RequestPay/RequestPay";
import AddRequestPay from "../components/Fastag/RequestPay/AddRequestPay";
import TransactionStatus from "../components/Fastag/TransactionStatus/TransactionStatus";
import ExceptionList from "../components/Fastag/ExceptionList/ExceptionList";
import QueryException from "../components/Fastag/QueryException/QueryException";

import { ForgotPassword } from "../components/Resident/ForgotPassword/ForgotPassword";
import { LandingPage } from "../components/Resident/LandingPage/LandingPage";
import { LoginPage } from "../components/Resident/LoginPage/LoginPage";
import { OtpView } from "../components/Resident/OtpView/OtpView";
import { OwnerDashbaord } from "../components/Resident/OwnerDashboard/OwnerDashbaord";
import { Report } from "../components/Resident/Report/Report";
import { ResetPassword } from "../components/Resident/ResetPassword/ResetPassword";
import { ResidentDashboard } from "../components/Resident/ResidentDashboard/ResidentDashboard";
import { AddResident } from "../components/Resident/ResidentMember/AddResident";
import { ViewResident } from "../components/Resident/ResidentMember/ViewResident";
import { Signup } from "../components/Resident/Signup/Signup";
import { AddVehicle } from "../components/Resident/Vehicle/AddVehicle";
import { ViewVehicle } from "../components/Resident/Vehicle/ViewVehicle";
import { ViewSociety } from "../components/Society/ViewSociety";
import { AddSocietyGate } from "../components/SocietyGate/AddSocietyGate";
import { ViewSocietyGate } from "../components/SocietyGate/ViewSocietyGate";
import { ViewPopUp } from "../components/ViewPopUp/ViewPopUp";
import ExamTest from "../components/Controller/exam-test";
import { ParkingOwnerDashbaord } from "../components/Resident/OwnerDashboard/ParkingOwnerDashboard";
import { ViewStaff } from "../components/Staff/ViewStaff";
import { AddStaff } from "../components/Staff/AddStaff";
import { ViewExceptionVehicle } from "../components/ExceptionVehicle/ViewExceptionVehicle";
import { AddExceptionVehicle } from "../components/ExceptionVehicle/AddExceptionVehicle";
import {
  TransactionReport,
  ViewTransactionReport,
} from "../components/TransactionReport/TransactionReport";
import { VehicleInOutReport } from "../components/VehicleReport/VehicleInOutReport";
import { VehicleOutReport } from "../components/VehicleReport/VehicleOutReport";
import { VehicleInReport } from "../components/VehicleReport/VehicleInReport";
import { FastagTransactionReport } from "../components/TransactionReport/FastagTransactionReport";
import { DocumentServiceLanding } from "../components/DocumentService/DocumentServiceLanding";
import { AddDocument } from "../components/DocumentService/AddDocument";
import { ViewDocument } from "../components/DocumentService/VIewDocument";
import { ViewDocumentPopUp } from "../components/DocumentService/ViewDocumentPopUp";
import { ResidentHeartbeat } from "../components/Heartbeat/ResidentHeartbeat";
import {
  ANPRCamera,
  EntryANPRCamera,
} from "../components/Resident/EntryANPRCamera/EntryANPRCamera";
import App from "../components/Todos/toda";
import { ResidentOwnerDashboard } from "../components/Resident/ResidentOwnerDashboard/ResidentOwnerDashboard";
import { ViewEntryVehicle } from "../components/Resident/Vehicle Report/ViewEntryVehicle";
import { ViewExitVehicle } from "../components/Resident/Vehicle Report/ViewExitVehicle";
import { ExitANPRCamera } from "../components/Resident/ExitANPRCamera/ExitANPRCamera";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/app" component={App} />

          <Route
            exact
            path="/ownerDashboard"
            component={ParkingOwnerDashbaord}
          />
          <Route
            exact
            path="/residentDashboard"
            component={ResidentDashboard}
          />
          <Route
            exact
            path="/residentOwnerDashboard"
            component={ResidentOwnerDashboard}
          />
          <Route exact path="/addVehicle" component={AddVehicle} />
          <Route exact path="/viewVehicle" component={ViewVehicle} />
          <Route exact path="/viewEntryVehicle" component={ViewEntryVehicle} />
          <Route exact path="/viewExitVehicle" component={ViewExitVehicle} />

          <Route exact path="/addResident" component={AddResident} />
          <Route exact path="/viewResident" component={ViewResident} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/fastag" component={Fastag} />

          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route exact path="/otp" component={OtpView} />
          <Route exact path="/viewSociety" component={ViewSociety} />
          <Route exact path="/viewSocietyGate" component={ViewSocietyGate} />
          <Route exact path="/addSocietyGate" component={AddSocietyGate} />
          <Route exact path="/addController" component={AddController} />

          <Route exact path="/viewController" component={ViewController} />
          <Route exact path="/heartbeat" component={Heartbeat} />

          <Route
            exact
            path="/residentheartbeat"
            component={ResidentHeartbeat}
          />
          <Route
            exact
            path="/residentEntryAnprCamera"
            component={EntryANPRCamera}
          />
          <Route
            exact
            path="/residentExitAnprCamera"
            component={ExitANPRCamera}
          />

          <Route exact path="/viewPopUp" component={ViewPopUp} />

          {/* Added Route  */}
          <Route exact path="/viewRequest" component={ViewRequest} />
          <Route exact path="/requestForm" component={RequestTags} />

          <Route exact path="/syncTime" component={SyncTime} />
          <Route exact path="/addSyncTime" component={AddSyncTime} />

          <Route exact path="/requestPay" component={RequestPay} />
          <Route exact path="/addRequestPay" component={AddRequestPay} />

          <Route exact path="/viewStaff" component={ViewStaff} />
          <Route exact path="/addStaff" component={AddStaff} />

          <Route
            exact
            path="/viewExceptionVehicle"
            component={ViewExceptionVehicle}
          />
          <Route
            exact
            path="/addExceptionVehicle"
            component={AddExceptionVehicle}
          />

          <Route
            exact
            path="/transactionStatus"
            component={TransactionStatus}
          />
          <Route exact path="/exceptionList" component={ExceptionList} />
          <Route exact path="/queryException" component={QueryException} />

          <Route exact path="/vehicleInReport" component={VehicleInReport} />
          <Route exact path="/vehicleOutReport" component={VehicleOutReport} />
          <Route
            exact
            path="/vehicleInOutReport"
            component={VehicleInOutReport}
          />
          <Route
            exact
            path="/fastagTransactionReport"
            component={FastagTransactionReport}
          />

          <Route
            exact
            path="/transactionReport"
            component={TransactionReport}
          />

          <Route
            exact
            path="/documentService"
            component={DocumentServiceLanding}
          />

          <Route exact path="/addDocument" component={AddDocument} />

          <Route exact path="/viewDocument" component={ViewDocument} />

          <Route
            exact
            path="/viewDocumentPopUp"
            component={ViewDocumentPopUp}
          />

          <Route exact path="/signup" component={Signup} />

          <Route exact path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

// black = #1D2B44
// yellow = #FFC738
