import image from "../../assets/orderSuccess.gif"
import { capturePayment } from '@/store/shop/order-slice';
import  { useEffect } from 'react';
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
    <>
    <div className="w-full min-h-screen justify-center flex ">
          <div className="container mx-auto w-full">
          <img className='mx-auto w-1/2 rounded-lg' 
          src={image}
          loading='lazy'
          alt="" />
          <h2 className='text-center text-lg font-semibold' >Thank You! Your Payment Was Successful 🙌 </h2>
          <h2 className='text-center text-lg font-semibold' >Processing order... </h2>
          </div>
        </div>
      
    </>
  )
}

export default PaymentReturnPage