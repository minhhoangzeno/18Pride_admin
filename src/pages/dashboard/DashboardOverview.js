
import { Row } from '@themesberg/react-bootstrap';
import React from "react";
import StatisticAttendanceUser from './StatisticAttendanceUser';
import StatisticAttendanceUserByAdmin from './StatisticAttendanceUserByAdmin';
import StatisticPaymentUser from './StatisticPaymentUser';
import StatisticPaymentUserByAdmin from './StatisticPaymentUserByAdmin';
import UserOverview from './UserOverview';


export default () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Row className="justify-content-md-center">
        {/* <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col> */}

        {(user.roles === "admin" || user.roles === "superadmin") && <UserOverview />}
        {(user.roles === "user") && <>
          <StatisticAttendanceUser />
          <StatisticPaymentUser />
        </>}

      </Row>
      <Row className="justify-content-md-center">
        {(user.roles === "admin" || user.roles === "superadmin") && <StatisticAttendanceUserByAdmin />}
      </Row>

      <Row className="justify-content-md-center mt-6">
        {(user.roles === "admin" || user.roles === "superadmin") && <StatisticPaymentUserByAdmin />}
      </Row>
    </>
  );
};
