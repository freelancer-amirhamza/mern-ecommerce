/* eslint-disable no-unused-vars */
import React from 'react';
import image from "../../assets/account.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Address from '@/components/shopping/address';
import ShoppingOrders from '@/components/shopping/orders';
import { Link } from 'react-router-dom';

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden ">
        <img src={image} alt="image"
        width={1600}
        height={300}
        style={{aspectRatio: "1600/300", objectFit: "cover"}}
        className='w-full h-full object-cover object-center ' />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background py-6 shadow-sm ">
          <Tabs defaultValue='orders' >
            <TabsList className="flex gap-5">
              <TabsTrigger  value="orders" >Orders</TabsTrigger>
              <TabsTrigger className="bg-white" value="address" >Address</TabsTrigger>
              <Link to={`/shop/home`} className='border px-2 py-1 font-medium  hover:border-muted-foreground  rounded-md  ' >Go Home</Link>
            </TabsList>
            <TabsContent value="orders" ><ShoppingOrders/></TabsContent>
            <TabsContent value="address"><Address/></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount