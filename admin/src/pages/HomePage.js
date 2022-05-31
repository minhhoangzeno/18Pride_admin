import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import { Routes } from "../routes";
import ForgotPassword from "./auth/ForgotPassword";
import Lock from "./layout/Lock";
import NotFoundPage from "./layout/NotFound";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import ProvideAuth from './ProvideAuth';





const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />

        <Component {...props} />
        <div style={{ paddingLeft: 30 }} >
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </div>
      </>
    )}
    />
  );
};

export default () => {

  return (
    <>
      <Switch>
        <RouteWithSidebar exact path={Routes.Signin.path} component={Signin} />
        <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
        <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
        <RouteWithSidebar exact path={Routes.Signin.path} component={Signin} />
        <RouteWithSidebar exact path={Routes.Signup.path} component={Signup} />
        <RouteWithSidebar exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
        {/* <RouteWithSidebar exact path={Routes.VerifyPassword.path} component={VerifyPassword} />
        <RouteWithSidebar exact path={Routes.VerifyEmail.path} component={VerifyEmail} /> */}

        <PrivateRoute path="/">
          <ProvideAuth />
        </PrivateRoute>
      </Switch>
    </>
  );
}


function PrivateRoute({ children, ...rest }) {
  let token = localStorage.getItem("token")

  if (token)
    return <AppRoute {...rest} children={children} />

  return <Redirect to={Routes.Signin.path} />
}

const AppRoute = (props) => {
  const { name, ...other } = props

  return <Route {...other} />
}