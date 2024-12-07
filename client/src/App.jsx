
import { Route, Routes } from 'react-router-dom';
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
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';
import { Skeleton } from './components/ui/skeleton';

function App() {
  const {user, isAuthenticated, isLoading } = useSelector((state)=> state.auth);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch]);


  if(isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
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
            <ShoppingLayout/>
          </CheckAuth>
        } >
        <Route path='account' element={<ShoppingAccount/>} />
        <Route path='home' element={<ShoppingHome/>} />
        <Route path='checkout' element={<ShoppingCheckout/>} />
        <Route path='listing' element={<ShoppingListing/>} />
        </Route>
        <Route path='*' element={<NotFound/>} />
        <Route path='unauth-page' element={<UnAuth/>} />
      </Routes>
    </div>
  )
}

export default App
