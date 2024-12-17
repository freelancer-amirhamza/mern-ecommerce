import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, getAddressList, updateAddress } from "@/store/shop/address-slice";
import { toast } from "@/hooks/use-toast";
import AddressCard from "./address-card";
const initialsAddressFormData = {
  address: "",
  city: "",
  pinCode: "",
  division: "",
  phone: "",
  notes: "",
};
const Address = () => {
  const [formData, setFormData] = useState(initialsAddressFormData);
  const dispatch = useDispatch();
  const [currentUpdatedAddress, setCurrentUpdatedAddress] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const { addressList } = useSelector((state) => state.addressSlice)
  const handleManageAddress = (event) => {
    event.preventDefault();


    if(addressList.length >= 3  && currentUpdatedAddress === null){
        setFormData(initialsAddressFormData);
      toast({
        title: "You can add maximum 3 addresses",
        variant: "destructive"
      })
      
      return
    }

    currentUpdatedAddress !== null ? 
    dispatch(updateAddress({
      userId: user?.id,
      addressId: currentUpdatedAddress,
      formData,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAddressList(user?.id));
        setCurrentUpdatedAddress(null);
        setFormData(initialsAddressFormData);
        toast({
          title: "Address updated successfully",
        });
      }
    }) :
      dispatch(addNewAddress({
        ...formData,
        userId: user?.id
      })).then((data) => {
        if (data?.payload?.success) {
          console.log(addressList)
          dispatch(getAddressList(user?.id))
          setFormData(initialsAddressFormData)
          toast({
            title: "Your Address list is created successfully!"
          })
        }
      })
  };

  const handleUpdateAddress = (getCurrentAddress) => {
    setCurrentUpdatedAddress(getCurrentAddress?._id)
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pinCode: getCurrentAddress?.pinCode,
      division: getCurrentAddress?.division,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    })
  }

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(deleteAddress({
      userId: user?.id,
      addressId: getCurrentAddress?._id
    }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getAddressList(user?.id));
          toast({
            title: "Address deleted successfully",
          });
        }
      })
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(getAddressList(user?.id))
  }, [dispatch])
  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-5 p-3">
        {addressList && addressList.length > 0 ? addressList.map(
          (addressItem) => <AddressCard key={addressItem.id}
            addressInfo={addressItem}
            handleDeleteAddress={handleDeleteAddress}
            handleUpdateAddress={handleUpdateAddress}
            setFormData={setFormData} />) : null}
      </div>
      <CardHeader>
        <CardTitle> {currentUpdatedAddress !== null ?
          "Update Your Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent >
        <CommonForm 
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentUpdatedAddress !== null ? "Update" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};
// 017
export default Address;
