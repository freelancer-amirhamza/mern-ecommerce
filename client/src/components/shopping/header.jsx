import {
  CircleUserRound,
  House,
  LogOut,
  Menu,
  ShoppingCart,
  Store,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { resetTokenAndCredential } from "@/store/authSlice";
import UserCartWrapper from "./cart-wrapper";
import { getCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem?.id !== "products" &&
        getCurrentMenuItem?.id !== "search" ?
        { category: [getCurrentMenuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null ?
      setSearchParams(`?category=${getCurrentMenuItem.id}`) :
      navigate(getCurrentMenuItem.path);
  };
  return (
    <nav className=" flex flex-col mb-3 lg:mb-0 lg:items-center lg:flex-row gap-6 ">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer "
        >
          {menuItem.label}{" "}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCarts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0)

  useEffect(() => {
    const qty = cartItems?.items?.reduce((prev, currentItem) => {
      return prev + currentItem.quantity
    }, 0)
    setTotalQty(qty);
    const tPrice = cartItems?.items?.reduce((sum, currentItem) => {
      return sum + (currentItem?.salePrice > 0 ?
        currentItem?.salePrice : currentItem?.price) * currentItem?.quantity
    }, 0)
    setTotalPrice(tPrice)
  }, [cartItems])

  const handleLogout = ()=>{
    // dispatch(logoutUser())
    dispatch(resetTokenAndCredential());
    sessionStorage.clear();
    navigate("/auth/login");
  }
  useEffect(() => {
    dispatch(getCartItems(user?.id));
  }, [dispatch]);
  return (
    <div className="flex flex-col  gap-4 lg:items-center lg:flex-row ">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          className=" w-full justify-between border-1 border-orange-200 hover:border-orange-500 flex"
          variant="outline"
        >
          <ShoppingCart className=" w-8 h-8  " />
          <div className="flex flex-col ">
            <span className="text-xs text-orange-600 text-start  font-extrabold ">
              {totalQty > 0 ? totalQty : 0} items
            </span>
            <span className="text-xs  text-orange-600 text-start font-extrabold ">
              ${totalPrice}
            </span>
          </div>

        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className=" bg-black text-white font-extrabold ">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-gray-200">
          <DropdownMenuLabel>Logged in as {user?.userName} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <CircleUserRound className=" mr-2 w-6  h-6 " />
            <span className="font-semibold text-base ">Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 w-4 h-4 " />
            <span className="font-semibold text-base ">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  return (
    <header className="sticky w-full z-40 border-b bg-background ">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 ">
        <Link to="/shop/home" className="flex items-center gap-2 ">
        <Store color="#c76c05" className="h-7 w-7 "  absoluteStrokeWidth />
          <span className="font-extrabold text-orange-500 text-3xl"> KAZI BAZAR </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden ">
              <Menu className="w-8 h-8" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className=" w-full max-w-xs" side="left">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />{" "}
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
