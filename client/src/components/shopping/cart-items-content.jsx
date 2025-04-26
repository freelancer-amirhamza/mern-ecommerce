/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartItems } from "@/store/shop/cart-slice";
import toast from "react-hot-toast";

const UserCartContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productsList } = useSelector((state) => state.shoppingProducts);
  const { cartItems } = useSelector((state) => state.shoppingCarts);
  
  const handleUpdateCartQuantity = (getCartItem, typeOfAction) => {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productsList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productsList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            // toast({
            //   title: `Only ${getQuantity} quantity can be added for this item`,
            //   variant: "destructive",
            // });
            toast.success(`Only ${getQuantity} quantity can be added for this item`)
            return;
          }
        }
      }
    }


    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data) {
        toast.success("Cart is updated successfully")
        
      }
    });
  };

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item is deleted successfully");
      }
    });
  };
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 object-cover rounded-lg "
      />
      <div className="flex-1">
        <h2 className="font-extrabold ">{cartItem?.title} </h2>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            onClick={() => handleUpdateCartQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity == 1}
            className="w-8 h-8 rounded-full "
          >
            <Minus className="w-1 h-1" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-bold">{cartItem?.quantity} </span>
          <Button
            onClick={() => handleUpdateCartQuantity(cartItem, "plus")}
            variant="outline"
            className="w-8 h-8 rounded-full "
          >
            <Plus className="w-1 h-1" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-semibold">
          {(
            (cartItem?.salePrice > 0
              ? cartItem?.salePrice
              : cartItem?.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 text-red-500 "
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartContent;
