/* eslint-disable react/prop-types */
// import { logoutUser } from '@/store/authSlice'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { resetTokenAndCredential } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({setOpen}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    // dispatch(logoutUser())
    dispatch(resetTokenAndCredential())
    sessionStorage.clear();
    navigate('/auth/login')
  }
  return (
    <header className='flex items-center justify-between px-4 py-3  border-b ' >
      <Button onClick={()=> setOpen(true)} className="lg:hidden sm:block " >
      <AlignJustify />
      <span className='sr-only' >Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end ">
        <Button onClick={handleLogout} className="inline-flex gap-2 px-4 py-3 items-center font-medium text-sm  rounded-md shadow ">
          <LogOut  />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader