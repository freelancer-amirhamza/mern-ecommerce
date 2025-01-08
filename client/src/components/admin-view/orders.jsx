import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import AdminOrdersDetailsView from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersByAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/orderSlice"
import { Badge } from "../ui/badge"



const AdminOrdersView = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { orderList, orderDetails } = useSelector((state) => state.adminOrders);
    const dispatch = useDispatch();

     const handleFetchOrderDetails = (getId)=>{
         dispatch(getOrderDetailsForAdmin(getId))
     }
    useEffect(()=>{
        if(orderDetails !== null){
            setOpenDetailsDialog(true)
        }
    },[orderDetails])
console.log(orderDetails)
    useEffect(() => {
        dispatch(getAllOrdersByAdmin())
    }, [dispatch])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderList.length > 0 ? orderList?.map((orderItem)=>(
                            <TableRow key={orderItem?.id}>
                            <TableCell>{orderItem?._id} </TableCell>
                            <TableCell>{orderItem?.orderDate.split("T")[0]} </TableCell>
                            <TableCell>
                            <Badge className={`${orderItem?.orderStatus === "confirmed" ? "bg-green-600" :
                                orderItem?.orderStatus === "rejected" ? "bg-red-600"
                                : "bg-orange-600"}`} >{orderItem?.orderStatus}
                            </Badge>
                            </TableCell>
                            <TableCell>${orderItem?.totalAmount} </TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={()=> {
                                    setOpenDetailsDialog(false);
                                    dispatch(resetOrderDetails())
                                } } >
                                    <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}  >View Details </Button>
                                    <AdminOrdersDetailsView orderDetails={orderDetails} />
                                </Dialog>

                            </TableCell>
                        </TableRow>
                        )) : null}
                        
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrdersView