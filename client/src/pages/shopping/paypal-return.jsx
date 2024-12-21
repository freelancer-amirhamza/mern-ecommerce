import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/order-slice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';


const PaymentReturnPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId")
  const payerId = params.get("PayerID")

  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    dispatch(capturePayment({ payerId, paymentId, orderId })).then((data) => {
      if (data?.payload?.success) {
        console.log(data?.payload?.success, "it's ok")
        sessionStorage.removeItem("currentOrderId");
        window.location.href = "/shop/payment-success"
      }
    })
  }, [payerId, paymentId, dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment is processing...! Please wait..!</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaymentReturnPage