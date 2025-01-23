import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
import image from "../../assets/order-complete.gif";

const PaymentSuccessPage = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="w-full min-h-screen justify-center flex ">
      <div className="container mx-auto mt-5 w-full">
      <img className='mx-auto w-4/5 h-2/4 rounded-lg' 
      src={image}
      loading='lazy'
      alt="" />
      <h2 className='text-center text-lg mt-6 font-semibold' >Order Successfully Completed 🙌 </h2>
      <h2 className='text-center text-base mt-2 font-semibold' >Your Order is on it&apos;s way 🏃‍♂️</h2>
      {/* <h2 className='text-center text-base mt-2 ' ><strong className='text-xl'>Order Id: </strong>{order_id}</h2> */}
      <Button  onClick={() => navigate("/shop/account")}
      text-button="View Orders"
      className="md:w-1/2 w-full items-center  mx-auto py-3 mt-5 block">View Your Orders</Button>
      </div>
    </div>
      
      </>
  )
}

export default PaymentSuccessPage