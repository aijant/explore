import Layout from '@components/layout'
import { ROUTES } from '@lib/constants/routes'
import PageDashboard from "@pages/dashboard";
import PageAuth from '@pages/auth'
import PageCompliance from "@pages/compliance";
import PageSafety from "@pages/safety";
import PageLocation from "@pages/location";
import PageAssets from "@pages/assets";
import PageMaintenance from "@pages/maintenance";
import PageEldEvents from "@pages/eld-events";
import PageGeofence from "@pages/geofence";
import PageDispatch from "@pages/dispatch";
import PageLoads from "@pages/loads";
import PageDocuments from "@pages/documents";
import PageReports from "@pages/reports";
import PageAdmin from "@pages/admin";
import PageAdminVehicles from "@pages/admin/AdminVehicles";
import PageAdminTrailers from "@pages/admin/AdminTrailers";
import PageAdminCompany from "@pages/admin/AdminCompany";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";

const {
  auth,
  dashboard,
  compliance,
  safety,
  location,
  assets,
  maintenance,
  eldEvents,
  geofence,
  dispatch,
  loads,
  documents,
  reports,
  admin,
  adminVehicles,
  adminTrailers,
  adminCompany,
} = ROUTES;

const AppRoute = () => {
  return (
    <Routes>
      <Route path={auth} element={<PageAuth />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path={dashboard} element={<PageDashboard />} />
          <Route path={compliance} element={<PageCompliance />} />
          <Route path={safety} element={<PageSafety />} />
          <Route path={location} element={<PageLocation />} />

          <Route path={assets} element={<PageAssets />} />
          <Route path={maintenance} element={<PageMaintenance />} />
          <Route path={eldEvents} element={<PageEldEvents />} />

          <Route path={geofence} element={<PageGeofence />} />
          <Route path={dispatch} element={<PageDispatch />} />
          <Route path={loads} element={<PageLoads />} />
          <Route path={documents} element={<PageDocuments />} />
          <Route path={reports} element={<PageReports />} />
          <Route path={admin} element={<PageAdmin />} />
          <Route path={adminVehicles} element={<PageAdminVehicles />} />
          <Route path={adminTrailers} element={<PageAdminTrailers />} />
          <Route path={adminCompany} element={<PageAdminCompany />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoute
