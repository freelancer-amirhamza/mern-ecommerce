/* eslint-disable react/prop-types */

import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox';

const AddressCard = ({addressInfo, handleUpdateAddress, handleDeleteAddress, setCurrentSelectedAddress, selectedId}) => {
    
  return (
    <Card onClick={setCurrentSelectedAddress? ()=> setCurrentSelectedAddress(addressInfo): null}
    className={`cursor-pointer border-orange-400 
      ${ selectedId?._id === addressInfo?._id ? "border-orange-600 border-[4px]" : "border-black"}
      `}
    >
        <CardContent className="grid p-5 capitalize gap-4 relative " >
            <Label className="text-[16px] font-semibold ">Address: <span className=" font-normal ">{addressInfo.address}</span> </Label>
            <Label className="text-[16px] font-semibold ">City: <span className=" font-normal ">{addressInfo.city}</span> </Label>
            <Label className="text-[16px] font-semibold ">Pincode: <span className=" font-normal ">{addressInfo.pinCode}</span> </Label>
            <Label className="text-[16px] font-semibold ">Division: <span className=" font-normal ">{addressInfo.division}</span> </Label>
            <Label className="text-[16px] font-semibold ">Phone: <span className=" font-normal ">{addressInfo.phone}</span> </Label>
            <Label className="text-[16px] font-semibold line-clamp-3 ">Notes: <span className=" font-normal ">{addressInfo.notes}</span> </Label>
        </CardContent>
        <CardFooter className="flex justify-between py-2 items-center px-5">
            <Button onClick={()=>handleUpdateAddress(addressInfo)} >Update</Button>
            <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard