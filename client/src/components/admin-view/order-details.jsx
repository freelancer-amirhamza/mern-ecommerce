
import { useState } from 'react'
import CommonForm from '../common/form'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

const AdminOrdersDetailsView = () => {
    const initialFormData = {
        status:""
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleUpdateStatus = (event)=>{
        event.preventDefault()
    }
  return (
    <DialogContent className='sm:max-w-[600px] ' >
        <div className="grid gap-6">
            <div className="grid gap-2">
                <div className="flex items-center mt-6 justify-between ">
                    <p className="font-medium">Order ID</p>
                    <Label>123456</Label>
                </div>
                <div className="flex items-center mt-2 justify-between ">
                    <p className="font-medium">Order Date</p>
                    <Label>12/12/2024</Label>
                </div>
                <div className="flex items-center mt-2 justify-between ">
                    <p className="font-medium">Order Price</p>
                    <Label>$5000</Label>
                </div>
                <div className="flex items-center mt-2 justify-between ">
                    <p className="font-medium">Order Status</p>
                    <Label>In Process</Label>
                </div>
            </div>
            <Separator/>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <h2 className="font-medium">Order Details</h2>
                    <ul className="grid gap-3">
                        <li className="flex justify-between items-center ">
                            <span className="">Order One </span>
                            <span className="">$4000 </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <h2 className="font-medium">Shipping Info</h2>
                    <ul className="grid gap-0.5 text-muted-foreground">
                        <span>John Doe</span>
                        <span>Address</span>
                        <span>City</span>
                        <span>Pincode</span>
                        <span>Phone</span>
                        <span>Notes</span>
                    </ul>
                </div>
            </div>
            <CommonForm 
            formControls={[
                {
                    label: "Order Status",
                    name: "status",
                    componentType: "select",
                    options:[
                        {id:"pending", label: "Pending"},
                        {id:"inProcess", label: "InProcess"},
                        {id:"inShopping", label: "In Shopping"},
                        {id:"delivered", label: "Delivered"},
                        {id:"rejected", label: "Rejected"},
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