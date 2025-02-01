import React, { useState } from 'react'
import { CircleUserRound, House, Search, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const MobileNavbar = ({openCart, setOpenCart}) => {
    
  const { cartItems } = useSelector((state) => state.shoppingCarts);

  return (
    <div className="flex w-full z-50 fixed  bg-slate-100 h-20 sm:hidden bottom-0 ">
        <div className="container w-full mx-auto justify-around text-orange-600 items-center inline-flex">
          <Link className='focus:border-2 w-14 h-14  flex items-center justify-center hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' to={`/shop/home`} ><House /> </Link>
          <Link className='focus:border-2 w-14 h-14  flex items-center justify-center hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' to={`/shop/listing`}><ShoppingBasket /> </Link>
          {/* <Link className='focus:border-2 w-14 h-14  flex items-center justify-center hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' to={`/shop/account`}><CircleUserRound /> </Link> */}
          <Link 
          onClick={()=> setOpenCart(!openCart)}
          className='focus:border-2 w-14 h-14  flex items-center justify-center
            hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' >
              <ShoppingBag className='relative w-full' />
              <span className="text-[11px]  text-center rounded-full absolute top-4 ml-4  w-4 h-4 flex items-center justify-center  text-white bg-orange-600 ">
                {cartItems?.items?.length > 0 ? cartItems?.items?.length  : null }</span>
              </Link>
          <Link className='focus:border-2 w-14 h-14  flex items-center justify-center hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' to={`/shop/search`}><Search /> </Link>
        </div>
      </div>
  )
}

export default MobileNavbar