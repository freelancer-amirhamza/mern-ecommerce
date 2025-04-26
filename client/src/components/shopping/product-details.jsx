/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/shoppingSlice";
import { Label } from "../ui/label";
import StarRating from "../common/star-rating";
import { addReviews, getReviews } from "@/store/shop/review-slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shoppingCarts);
    const {reviews } = useSelector((state)=> state.reviewsSlice)
    const [reviewMsg, setReviewMsg]= useState("")
    const [rating, setRating]= useState(0);
    const navigate = useNavigate()
    
    const handleRatingChange = (getRating)=> {
        setRating(getRating)
    }
    
    const handleAddReview= ()=>{
        dispatch(addReviews({
            userId: user?.id,
            userName: user?.userName,
            productId: productDetails?._id,
            reviewValue: rating,
            reviewMessage: reviewMsg
        })).then((data)=>{
            if(data?.payload?.success){
                setRating(0);
                setReviewMsg("")
                dispatch(getReviews(productDetails._id))
                toast("Your Review added successfully!")
            }
        })
    };

    useEffect(()=>{
        if(productDetails !== null){
            dispatch(getReviews(productDetails?._id))
        }
    },[productDetails]);


    const averageReview = reviews && reviews.length > 0 ?
     reviews.reduce((sum, reviewItem)=> sum + reviewItem.reviewValue , 0)/ reviews.length : 0

    const handleAddToCart = (getCurrentProductId, getTotalStock) => {
        let getCartItem = cartItems.items || [];

        if (getCartItem.length) {
            const indexOfCurrentItem = getCartItem.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItem[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: "destructive",
                    });
                    return;
                }
            }
        }
        if(isAuthenticated){
            dispatch(
                addToCart({
                    userId: user?.id,
                    productId: getCurrentProductId,
                    quantity: 1,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(getCartItems(user?.id));
                    toast( "This Product added to cart!");
                }else{
                    return toast.error(data.message)
                }
            });
        }else{
            toast.error("Please Login your account before buy this product")
            navigate("/auth/login")
        }
        
    };
    const handleDialogClose = ()=>{
        setOpen(false)
        dispatch(setProductDetails());
        setRating(0)
        setReviewMsg("")
    }
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-1 h-full overflow-y-scroll  sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[85vw] lg:max-w-[75vw] ">
                <div className="relative rounded-lg ">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover "
                    />
                </div>
                <div className="">
                    <div className="">
                        <h1 className="text-3xl font-extrabold ">
                            {productDetails?.title}{" "}
                        </h1>
                        <p className="text-muted-foreground font-semibold text-xl py-3">
                            {productDetails?.description}{" "}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 ">
                        <p
                            className={`text-xl  text-muted-foreground ${productDetails?.salePrice > 0 ? "line-through" : ""
                                } `}
                        >
                            TK:{productDetails?.price.toFixed(2)}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-green-700  ">
                                TK:{productDetails?.salePrice.toFixed(2)}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center w-full justify-between">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex p-0 m-0 items-center ">
                                <StarRating rating={averageReview}/>
                            </div>
                            <span className="text-muted-foreground">Rating:({averageReview.toFixed(2)})</span>
                        </div>
                        {/* <span className=" md:block hidden">{productDetails?.brand} </span> */}
                    </div>
                    <div className="mt-5 mb-5">
                        {productDetails?.totalStock === 0 ?
                            <Button
                                className="w-full cursor-not-allowed opacity-50 "
                            > Out of stock</Button> :
                            <Button
                                onClick={() => handleAddToCart(
                                    productDetails?._id,
                                    productDetails?.totalStock
                                )}
                                className="w-full"
                            >
                                Add to Cart
                            </Button>
                        }
                    </div>
                    <Separator />
                    <div className="max-h-[300px]  ">
                        <h2 className="text-xl font-bold mb-4 ">Reviews</h2>
                        <div className="grid gap-6  ">
                            {reviews?.length > 0 ? reviews.map((reviewItem)=>(
                                <div key={reviewItem.id} className="flex gap-4">
                                <Avatar className="w-10  h-10 border ">
                                    <AvatarFallback className="bg-muted-foreground text-white font-bold">
                                        {reviewItem?.userName[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                                    </div> 
                                    <div className="flex items-center">
                                    <StarRating rating={reviewItem.reviewValue}/>
                                    </div>
                                    <p className="text-muted-foreground">
                                        {reviewItem?.reviewMessage}
                                    </p>
                                </div>
                            </div>
                            )) : <div>No review found!</div>}
                            
                            <div className="flex gap-2 mt-10 flex-col">
                                <Label > Write a review...</Label>
                                <div className=" flex gap-1">
                                    <StarRating  rating={rating}
                                    handleRatingChange={handleRatingChange} />
                                </div>
                                <Input className=""
                                name="reviewMsg"
                                value={reviewMsg}
                                onChange={(event)=> setReviewMsg(event.target.value)}
                                placeholder="Write your review" />
                                <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""} >Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailsDialog;
