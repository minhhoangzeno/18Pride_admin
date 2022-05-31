// =========================================================
// * Volt React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * Official Repository: https://github.com/themesberg/volt-react-dashboard
// * License: MIT License (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import React from 'react';
// vendor styles
import "react-datetime/css/react-datetime.css";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
// core styles
import "./scss/volt.scss";




ReactDOM.render(
  <BrowserRouter basename="/" >
    <ToastProvider>
      <ScrollToTop />
      <HomePage />
    </ToastProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
