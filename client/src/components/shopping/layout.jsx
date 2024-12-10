import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
        <ShoppingHeader/>
        <div className="flex flex-col w-full">
          <Outlet/>
        </div>
        
    </div>
  )
}

export default ShoppingLayout