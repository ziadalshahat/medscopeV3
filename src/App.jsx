import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import SuperAdminRoutes from "./superAdmin/superAdminRoutes.jsx";
import AdminRoutes from "./Admin/AdminRoutes.jsx";
import DoctorRoutes from "./Doctor/doctorRoutes.jsx";


import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import ResetSuccess from "./pages/ResetSuccess";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";

import PatientRoutes from "./patient/patientRoutes.jsx";

import PrivacyPolicy from "./pages/info/PrivacyPolicy";
import TermsConditions from "./pages/info/TermsConditions";
import FAQs from "./pages/info/FAQs";
import SupportCenter from "./pages/info/SupportCenter";

// Public Layout
function PublicLayout() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/otp-verification" element={<OtpVerification />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/reset-success" element={<ResetSuccess />} />

          <Route path="/home" element={<Home />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route path="/terms" element={<TermsConditions />} />

          <Route path="/faqs" element={<FAQs />} />

          <Route path="/support" element={<SupportCenter />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Patient Module */}
        <Route path="/patient/*" element={<PatientRoutes />} />

        {/* Super Admin Module */}
        <Route path="/super-admin/*" element={<SuperAdminRoutes />} />

        {/* Admin Module */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/*Doctor Module*/}
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        
      </Routes>
    </Router>
  );
}

export default App;
