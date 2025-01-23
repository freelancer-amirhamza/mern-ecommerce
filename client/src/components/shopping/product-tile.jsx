/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

const ShoppingProductTile = ({
    product,
    handleGetProductDetails,
    handleAddToCart,
}) => {
    return (
        <Card className="w-full mex-w-sm mx-auto">
            <div className="" onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product.title}
                        className="w-full h-[300px] rounded-t-lg object-cover "
                    />
                    {product?.totalStock <= 0 ?
                        <Badge className=" absolute top-2 px-1 py-0 left-2 bg-red-500 hover:bg-red-600 ">
                            Out of stack
                        </Badge> :
                        product?.totalStock <= 10 ?
                            <Badge className=" absolute top-2 px-1 py-0 left-2 bg-red-500 hover:bg-red-600 ">
                                Only {product?.totalStock} products left!
                            </Badge> : null}
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2  "> {product.title} </h2>
                    {/* <span className="text-muted-foreground">Rating:({averageReview.toFixed(2)})</span> */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                            {categoryOptionsMap[product?.category]}{" "}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {brandOptionsMap[product?.brand]}{" "}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? "line-through text-muted-foreground" : ""}`}>
                            TK:{product?.price.toFixed(2)}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg text-primary font-semibold ">
                                TK:{product?.salePrice.toFixed(2)}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                {product?.totalStock <= 0 ?
                    <Button
                        
                        className="w-full cursor-not-allowed opacity-55"
                    >
                        Out of stock
                    </Button> :
                    <Button
                        onClick={() => handleAddToCart(product?._id, product?.totalStock)}
                        className="w-full"
                    >
                        Add to Cart
                    </Button>
                }
            </CardFooter>
        </Card>
    );
};

export default ShoppingProductTile;
