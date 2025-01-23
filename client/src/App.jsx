
import { Link, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import Register from './pages/auth/register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminFeatures from './pages/admin/features';
import AdminOrders from './pages/admin/orders';
import AdminProducts from './pages/admin/products';
import ShoppingLayout from './components/shopping/layout';
import NotFound from './pages/not-found';
import ShoppingAccount from './pages/shopping/account';
import ShoppingHome from './pages/shopping/home';
import ShoppingCheckout from './pages/shopping/checkout';
import ShoppingListing from './pages/shopping/listing';
import CheckAuth from './components/common/check-auth';
import UnAuth from './pages/un-auth';
import Login from './pages/auth/login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuth } from './store/authSlice';
import { Skeleton } from './components/ui/skeleton';
import PaymentReturnPage from './pages/shopping/paypal-return';
import PaymentSuccessPage from './pages/shopping/payment-success';
import SearchProducts from './pages/shopping/search';
import { House, Search, ShoppingBag, ShoppingBasket } from 'lucide-react';

function App() {
  const {user, isAuthenticated, isLoading } = useSelector((state)=> state.auth);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = JSON.parse(sessionStorage.getItem("token"))
    dispatch(checkAuth(token))
  },[dispatch]);


  if(isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path='/' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        } />
        <Route path='/auth' element={
          <CheckAuth 
          isAuthenticated={isAuthenticated} 
          user={user} >
            <AuthLayout/>
          </CheckAuth>
        } >
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AdminLayout/>
          </CheckAuth>
        } >
        <Route path='dashboard' element={<AdminDashboard/>} />
        <Route path='features' element={<AdminFeatures/>} />
        <Route path='orders' element={<AdminOrders/>} />
        <Route path='products' element={<AdminProducts/>} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShoppingLayout openCart={openCart} />
          </CheckAuth>
        } >
        <Route path='account' element={<ShoppingAccount/>} />
        <Route path='home' element={<ShoppingHome/>} />
        <Route path='checkout' element={<ShoppingCheckout/>} />
        <Route path='listing' element={<ShoppingListing/>} />
        <Route path='paypal-return' element={<PaymentReturnPage/>} />
        <Route path='payment-success' element={<PaymentSuccessPage/>} />
        <Route path='search' element={<SearchProducts/>} />
        </Route>
        <Route path='*' element={<NotFound/>} />
        <Route path='unauth-page' element={<UnAuth/>} />

      </Routes>


      <div className="flex w-full z-50 fixed  bg-slate-100 h-20 sm:hidden bottom-0 ">
        <div className="container w-full mx-auto justify-around text-orange-600 items-center inline-flex">
          <Link className='focus:border-2 w-14 h-14  flex items-center justify-center hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' to={`/shop/home`} ><House /> </Link>
          <Link className='focus:border-2 w-14 h-14  flex items-center justify-center hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' to={`/shop/listing`}><ShoppingBasket /> </Link>
          <Link onClick={()=> setOpenCart(!openCart)} className='focus:border-2 w-14 h-14  flex items-center justify-center hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' ><ShoppingBag /> </Link>
          <Link className='focus:border-2 w-14 h-14  flex items-center justify-center hover:bg-orange-300/10 duration-75  hover:border-2 border-orange-700  rounded-full ' to={`/shop/search`}><Search /> </Link>
        </div>
      </div>
    </div>
  )
}

export default App
