import { Button } from "@/components/ui/button";
import image1 from "../../assets/banner-1.webp";
import image2 from "../../assets/banner-2.webp";
import image3 from "../../assets/banner-3.png";
import image4 from "../../assets/banner-4.png";
import {
  Airplay,
  BabyIcon,
  BeefIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightningIcon,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFilteredProducts,
  getProductDetails,
} from "@/store/shop/shoppingSlice";
import ShoppingProductTile from "@/components/shopping/product-tile";
import {  useNavigate } from "react-router-dom";
import { addToCart, getCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping/product-details";
import { getFeatureImages } from "@/store/common/feature-slice";

const categoriesWithIcons = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightningIcon },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  { id: "foods", label: "Foods", icon: BeefIcon },
];
const brandsWithIcons = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
const ShoppingHome = () => {
  const slides = [image1, image2, image3, image4];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch();
  const { productsList, productDetails } = useSelector((state) => state.shoppingProducts);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {featureImagesList} = useSelector((state)=> state.commonSlice)




  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(getProductDetails(getCurrentProductId));
    console.log(getCurrentProductId);
  };

  const handleAddToCart = (getCurrentProductId) => {
    console.log(isAuthenticated,"true")
    if(isAuthenticated){
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(getCartItems(user?.id));
          toast({
            title: "This Product added to cart!",
          });
        }
      });
    }else{
      toast({
        title: "Please Login your account before buy this product",
        variant: "destructive"
      })
      navigate("/auth/login")
    }
    
  };

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  useEffect(() => {
    dispatch(
      getAllFilteredProducts({ filterParams: {}, sortParams: "priceLoToHigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImagesList.length);
    }, 6000);
    return () => clearInterval(timer);
  },[featureImagesList]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(()=>{
    dispatch(getFeatureImages())
  },[dispatch])
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] max-sm:h-[300px] overflow-hidden ">
        {featureImagesList && featureImagesList.length > 0 ? featureImagesList.map((slide, index) => (
          <img
            src={slide.image}
            key={index}
            alt={slide}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 `}
          />
        )): null }
        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + featureImagesList.length) % featureImagesList.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute rounded-full  left-4 top-1/2 transform -translate-y-1/2 bg-white/10 text-white hover:bg-white/50 "
        >
          <ChevronLeftIcon size={40} className=" w-8 text-5xl h-8 " />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImagesList.length)
          }
          variant="outline"
          size="icon"
          className="absolute  rounded-full right-4 top-1/2 transform -translate-y-1/2 bg-white/10 text-white hover:bg-white/50"
        >
          <ChevronRightIcon size={40} className=" w-8 text-5xl h-8 " />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
            {categoriesWithIcons.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow bg-gray-200 rounded-lg"
                key={categoryItem}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label} </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
            {productsList && productsList.length > 0
              ? productsList.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                    handleGetProductDetails={handleGetProductDetails}
                    key={productItem.id}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
            {brandsWithIcons.map((brandItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(brandItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow bg-gray-200 rounded-lg"
                key={brandItem}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label} </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      
    </div>
  );
};

export default ShoppingHome;
