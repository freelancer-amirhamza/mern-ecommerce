import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'

const AdminHeader = ({setOpen}) => {
  return (
    <header className='flex items-center justify-between px-4 py-3  border-b ' >
      <Button onClick={()=> setOpen(true)} className="lg:hidden sm:block " >
      <AlignJustify />
      <span className='sr-only' >Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end ">
        <Button className="inline-flex gap-2 px-4 py-3 items-center font-medium text-sm  rounded-md shadow ">
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader