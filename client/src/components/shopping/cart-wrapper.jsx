/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity, 0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md ">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartContent cartItems={item} key={item.id} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount} </span>
        </div>
      </div>
      <Button className="w-full mt-5">Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;