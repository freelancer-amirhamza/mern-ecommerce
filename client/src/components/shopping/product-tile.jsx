/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

const ShoppingProductTile = ({ product }) => {
    return (
        <Card className="w-full mex-w-sm mx-auto">
            <div className="">
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product.title}
                        className="w-full h-[300px] rounded-t-lg object-cover "
                    />
                    {product?.salePrice > 0 ? (
                        <Badge className=" absolute top-2 px-1 py-0 left-2 bg-red-500 hover:bg-red-600 ">
                            Sale
                        </Badge>
                    ) : null}
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2  "> {product.title} </h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                            {categoryOptionsMap[product?.category]}{" "}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {brandOptionsMap[product?.brand]}{" "}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? "line-through" : ""}`}>
                            ${product?.price}{" "}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg text-primary font-semibold ">
                                ${product?.salePrice}{" "}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Add to Cart</Button>
                </CardFooter>
            </div>
        </Card>
    );
};

export default ShoppingProductTile;