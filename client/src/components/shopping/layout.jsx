/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'
import Footer from './footer'

const ShoppingLayout = ({openCart}) => {
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
        <ShoppingHeader  openCart={openCart} />
        <div className="flex flex-col w-full">
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default ShoppingLayout