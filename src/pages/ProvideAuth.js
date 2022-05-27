import React, { useEffect, useState } from "react";
// import { AppRoute, routes } from "../../AppRoutes";
import {
    Redirect, Route, Switch
} from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import Sidebar from "../components/Sidebar";
import { Routes } from "../routes";
import Blog from "./blog/Blog";
import BlogAdd from './blog/BlogAdd';
import BlogDetail from "./blog/BlogDetail";
import BlogEdit from "./blog/BlogEdit";
import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navbars from "./components/Navbars";
import Navs from "./components/Navs";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Toasts from "./components/Toasts";
import Tooltips from "./components/Tooltips";
import DashboardOverview from "./dashboard/DashboardOverview";
import ChangePassword from "./examples/ChangePassword";
import Feedback from "./feedback/Feedback";
import Settings from './Settings';
import BootstrapTables from "./tables/BootstrapTables";
import Transactions from "./Transactions";
import User from "./user/User";
import Video from "./video/Video";
import VideoAdd from "./video/VideoAdd";
import VideoDetail from "./video/VideoDetail";
import VideoEdit from "./video/VideoEdit";

import Category from "./category/Category";
import CategoryAdd from "./category/CategoryAdd";
import CategoryDetail from "./category/CategoryDetail";
import CategoryEdit from "./category/CategoryEdit";
import Attendance from "./attendance/Attendance";
import AttendanceAdd from "./attendance/AttendanceAdd";
import AttendanceEdit from "./attendance/AttendanceEdit";
import AttendanceDetail from "./attendance/AttendanceDetail";
import Payment from "./payment/Payment";
import PaymentAdd from "./payment/PaymentAdd";
import PaymentEdit from "./payment/PaymentEdit";
import PaymentDetail from "./payment/PaymentDetail";
import AttendanceUser from "./attendance/AttendanceUser";
import PaymentUser from "./payment/PaymentUser";
import PaymentInfor from "./payment/PaymentInfor";
import FeedbackUser from "./feedback/FeedbackUser";


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
                <Sidebar />

                <main className="content">
                    <Navbar />
                    <Component {...props} />
                    <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
                </main>
            </>
        )}
        />
    );
};


export default function ProvideAuth() {
    return (
        <Switch>



            {/* pages */}
            <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
            <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
            <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

            {/* components */}
            <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
            <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
            <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
            <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
            <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
            <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
            <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
            <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
            <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
            <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
            <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
            <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
            <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
            <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
            <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
            <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />
            <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
            <RouteWithSidebar exact path={Routes.ChangePassword.path} component={ChangePassword} />
            {/* components */}

            <RouteWithSidebar exact path={Routes.Blog.path} component={Blog} />
            <RouteWithSidebar exact path={Routes.BlogAdd.path} component={BlogAdd} />
            <RouteWithSidebar exact path={Routes.BlogDetail.path} component={BlogDetail} />
            <RouteWithSidebar exact path={Routes.BlogEdit.path} component={BlogEdit} />


            <RouteWithSidebar exact path={Routes.Video.path} component={Video} />
            <RouteWithSidebar exact path={Routes.VideoAdd.path} component={VideoAdd} />
            <RouteWithSidebar exact path={Routes.VideoDetail.path} component={VideoDetail} />
            <RouteWithSidebar exact path={Routes.VideoEdit.path} component={VideoEdit} />


            <RouteWithSidebar exact path={Routes.Category.path} component={Category} />
            <RouteWithSidebar exact path={Routes.CategoryAdd.path} component={CategoryAdd} />
            <RouteWithSidebar exact path={Routes.CategoryDetail.path} component={CategoryDetail} />
            <RouteWithSidebar exact path={Routes.CategoryEdit.path} component={CategoryEdit} />

            <RouteWithSidebar exact path={Routes.User.path} component={User} />
            <RouteWithSidebar exact path={Routes.Feedback.path} component={Feedback} />
            <RouteWithSidebar exact path={Routes.FeedbackUser.path} component={FeedbackUser} />

            <RouteWithSidebar exact path={Routes.Attendance.path} component={Attendance} />
            <RouteWithSidebar exact path={Routes.AttendanceAdd.path} component={AttendanceAdd} />
            <RouteWithSidebar exact path={Routes.AttendanceEdit.path} component={AttendanceEdit} />
            <RouteWithSidebar exact path={Routes.AttendanceDetail.path} component={AttendanceDetail} />
            <RouteWithSidebar exact path={Routes.AttendanceUser.path} component={AttendanceUser} />

            <RouteWithSidebar exact path={Routes.Payment.path} component={Payment} />
            <RouteWithSidebar exact path={Routes.PaymentAdd.path} component={PaymentAdd} />
            <RouteWithSidebar exact path={Routes.PaymentEdit.path} component={PaymentEdit} />
            <RouteWithSidebar exact path={Routes.PaymentDetail.path} component={PaymentDetail} />
            <RouteWithSidebar exact path={Routes.PaymentUser.path} component={PaymentUser} />
            <RouteWithSidebar exact path={Routes.PaymentInfor.path} component={PaymentInfor} />


            <Redirect from="/" to="/" />
        </Switch>

    )
}
