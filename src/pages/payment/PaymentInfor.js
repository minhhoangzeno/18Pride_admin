import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { paymentUserStatusThunk } from '../../redux/paymentSlice';
import NotFound from '../examples/NotFound';
export default () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const [checkVerify, setCheckVerify] = useState(false);

  let search = async () => {
    let data = await dispatch(paymentUserStatusThunk(query.get('paymentUser')));
    if (data) {
      setCheckVerify(true)
    }
  }
  useEffect(() => {
    search()
  }, [query.get('paymentUser')]) // eslint-disable-line react-hooks/exhaustive-deps
  return (

    <>
      {checkVerify ? <div style={{ backgroundColor: '#fff', padding: 50 }} >
        <div style={{ display: 'flex', justifyContent: 'center' }} ><img alt='' width={50} src="data:image/png;base64,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" /></div>
        <p style={{ textAlign: 'center', marginTop: 20 }} >Thanh toán thành công!</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }} >
          <label>Hình thức thanh toán</label>
          <div>Chuyển khoản</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }} >
          <label>Ngân hàng</label>
          <div>NCB -  Ngân hàng TMCP Quốc Dân</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }} >
          <label>Mã giao dịch</label>
          <div>{query.get('vnp_BankTranNo')}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }} >
          <label>Số hóa đơn</label>
          <div>{query.get('vnp_TxnRef')}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }} >
          <label>Số tiền</label>
          <div>{query.get('vnp_Amount') / 100}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }} >
          <label>Nội dung thanh toán</label>
          <div>{query.get('vnp_OrderInfo')}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }} >
          <label>Ngày giao dịch</label>
          <div>{moment(query.get('vnp_PayDate'), "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm:ss")}</div>
        </div>
      </div>
        : <NotFound />
      }
    </>


  )
}