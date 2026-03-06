import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

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

          <Route path="/" element={<Login />} />

          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/otp-verification" element={<OtpVerification />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/reset-success" element={<ResetSuccess />} />

          <Route path="/home" element={<Home />} />

          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>

    </Router>
  );
}

export default App;