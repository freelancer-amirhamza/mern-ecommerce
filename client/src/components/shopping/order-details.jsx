import { useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"


function ShoppingOrderDetailsView({ orderDetails }) {
    const {user} = useSelector((state)=> state.auth)
    console.log(orderDetails, "it's ok")
    return (
        <DialogContent className='sm:max-w-[600px] ' >
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex items-center mt-6 justify-between ">
                        <p className="font-medium">Order ID</p>
                        <Label >{orderDetails?._id} </Label>
                    </div>
                    <div className="flex items-center mt-2 justify-between ">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]} </Label>
                    </div>
                    <div className="flex items-center mt-2 justify-between ">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount} </Label>
                    </div>
                    <div className="flex items-center mt-2 justify-between ">
                        <p className="font-medium">Payment Method:</p>
                        <Label>{orderDetails?.paymentMethod} </Label>
                    </div>
                    <div className="flex items-center mt-2 justify-between ">
                        <p className="font-medium">Payment Status:</p>
                        <Label>{orderDetails?.paymentStatus} </Label>
                    </div>
                    <div className="flex items-center mt-2 justify-between ">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge className={`${orderDetails?.orderStatus === "confirmed" ? "bg-green-600" : "bg-orange-500"}`} >{orderDetails?.orderStatus} </Badge>
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <h2 className="font-medium">Order Details</h2>
                        <ul className="grid gap-3">
                            {orderDetails?.cartItems && orderDetails?.cartItems?.length > 0 ? 
                            orderDetails?.cartItems?.map((orderItem)=>(
                                <li className="flex justify-between items-center " key={orderItem}>
                                <span className="">Title: {orderItem?.title} </span>
                                <span className="">Quantity: {orderItem?.quantity} </span>
                                <span className="">Price: {orderItem?.price} </span>
                            </li>
                            )) :null
                        }
                            
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <h2 className="font-medium">Shipping Info</h2>
                        <ul className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.userName} </span>
                            <span>Address: {orderDetails?.addressInfo?.address} </span>
                            <span>City: {orderDetails?.addressInfo?.city} </span>
                            <span>Pincode :{orderDetails?.addressInfo?.pinCode}</span>
                            <span>Phone: {orderDetails?.addressInfo?.phone}</span>
                            <span>Notes: {orderDetails?.addressInfo?.notes}</span>
                        </ul>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ShoppingOrderDetailsView