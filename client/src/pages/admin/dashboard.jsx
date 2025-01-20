import React, { useEffect, useState } from 'react'
import ProductImageUpload from './image-upload'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button';
import { addFeatureImage, getFeatureImages } from '@/store/common/feature-slice';
import { XIcon } from 'lucide-react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { featureImagesList } = useSelector((state) => state.commonSlice);
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  console.log(featureImagesList, "featureImagesList");
  const handleUploadFeatureImage = () => {
    try {
      dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
          setImageFile(null);
          setUploadedImageUrl("")
        }
      })
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch])

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyle={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full" >Upload Image</Button>

      {featureImagesList && featureImagesList.length > 0 ? featureImagesList.map((imageItem) => (
        <div className="flex flex-col mt-5 gap-5 relative" key={imageItem._id}>
          <img src={imageItem?.image} alt={imageItem?.name}
            className=' w-full h-[350px] object-cover rounded-md  ' />
          <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground top-2 right-2 absolute " >
            <XIcon className='w-5 h-5' />
            <span className="sr-only">Remove Image</span>
          </Button>
        </div>
      )) : null}
    </div>

  )
}

export default AdminDashboard