import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import AdminOrdersDetailsView from "./order-details"


const AdminOrdersView = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
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
                        <TableRow>
                            <TableCell>1234567</TableCell>
                            <TableCell>12/12/24</TableCell>
                            <TableCell>In Process</TableCell>
                            <TableCell>$3476.0</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog} >
                                    <Button onClick={()=> setOpenDetailsDialog(true)} >View Details </Button>
                                    <AdminOrdersDetailsView/>
                                </Dialog>
                                
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrdersView