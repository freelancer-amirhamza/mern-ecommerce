
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/account.jpg";
import UserCartContent from "@/components/shopping/cart-items-content";
import { Button } from "@/components/ui/button";
import Address from "@/components/shopping/address";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "@/hooks/use-toast";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCarts)
  const { user } = useSelector((state) => state.auth);
  const {approvalURL} = useSelector((state)=> state.orderSlice);
  const  [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();


  const handleOrderPaymentData = () => {
    if(cartItems.length === 0){
      toast({
        title: "Your cart is empty!",
        description: "please add products to processing payment",
        variant: "destructive",
      })
      return;
    }

    if(currentSelectedAddress === null){
      toast({
        title: "Please Select Your Address",
        variant: "destructive"
      })
      return;
    };

    
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo : {
        addressId:currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        division: currentSelectedAddress?.division,
        pinCode: currentSelectedAddress?.pinCode,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus : "pending",
      paymentMethod : "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId : '',
      payerId : "",
    };

    dispatch(createNewOrder(orderData)).then((data)=> {
      console.log(data)
      if(data?.payload?.success){
        setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false);
      }
    });
  }


  
  if(approvalURL){
      window.location.href = approvalURL;
    }

  const totalCartAmount =
    cartItems && cartItems?.items && cartItems?.items?.length > 0
      ? cartItems?.items?.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity, 0
      )
      : 0;
  return (

    <div className="flex flex-col ">
      <div className="relative h-[300px] w-full overflow-hidden ">
        <img src={image}
          className='w-full h-full object-cover object-center '
          alt="" />
      </div>
      <div className="flex container mx-auto w-full flex-col-reverse md:flex-row  gap-3 p-5 m-5">
        <Address 
        selectedId={currentSelectedAddress}
        setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col w-full border rounded-sm flex-1 gap-5 p-5 mt-5">
          {cartItems && cartItems?.items && cartItems?.items.length > 0 ?
            cartItems?.items.map(
              (item) => <UserCartContent cartItem={item} key={item.id} />) : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount} </span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleOrderPaymentData} className="w-full " > {isPaymentStart ? "Processing Order..." : "Place Order Cash On Delivery" }</Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShoppingCheckout