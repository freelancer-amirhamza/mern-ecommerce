
import { useState } from 'react'
import CommonForm from '../common/form'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { getAllOrdersByAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/orderSlice'

const AdminOrdersDetailsView = ({ orderDetails }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const initialFormData = {
        status: ""
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleUpdateStatus = (event) => {
        event.preventDefault()
        const { status } = formData;
        dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status }))
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(getOrderDetailsForAdmin(orderDetails?._id))
                    dispatch(getAllOrdersByAdmin())
                    setFormData(initialFormData);
                    console.log(formData, "it's ok form data")
                }
            })

    }
    return (
        <DialogContent className='sm:max-w-[600px] overflow-y-scroll h-full ' >
            <div className="grid gap-6 ">
                <div className="grid gap-2">
                    <div className="flex items-center mt-6 justify-between ">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id} </Label>
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
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge className={`${orderDetails?.orderStatus === "confirmed" ? "bg-green-600" :
                                orderDetails?.orderStatus === "rejected" ? "bg-red-600"
                                : "bg-orange-600"}`} >{orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <h2 className="font-medium">Order Details</h2>
                        <ul className="grid gap-3">
                            {orderDetails?.cartItems && orderDetails?.cartItems?.length > 0 ? orderDetails?.cartItems.map((orderItem) => (
                                <li key={orderItem?.id} className="flex justify-between items-center ">
                                    <span className="">Title: {orderItem?.title} </span>
                                    <span className="">Quantity: {orderItem?.quantity} </span>
                                    <span className="">Price: TK:{orderItem?.price} </span>
                                </li>
                            )) : null}

                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <h2 className="font-medium">Shipping Info</h2>
                        <ul className="grid gap-0.5 text-muted-foreground">
                            <span>Name: {user?.userName} </span>
                            <span>Address: {orderDetails?.addressInfo?.address} </span>
                            <span>City: {orderDetails?.addressInfo?.city} </span>
                            <span>Pincode :{orderDetails?.addressInfo?.pinCode}</span>
                            <span>Phone: {orderDetails?.addressInfo?.phone}</span>
                            <span>Notes: {orderDetails?.addressInfo?.notes}</span>
                        </ul>
                    </div>
                </div>
                <CommonForm
                    formControls={[
                        {
                            label: "Order Status",
                            name: "status",
                            componentType: "select",
                            options: [
                                { id: "pending", label: "Pending" },
                                { id: "inProcess", label: "In Process"},
                                { id: "inShopping", label: "In Shopping" },
                                { id: "confirmed", label: "Confirmed" },
                                { id: "delivered", label: "Delivered" },
                                { id: "rejected", label: "Rejected" },
                            ]
                        }
                    ]}
                    buttonText={"Update Orders Status"}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleUpdateStatus}
                />

            </div>
        </DialogContent>
    )
}

export default AdminOrdersDetailsView