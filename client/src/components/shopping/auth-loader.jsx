import React from 'react'
import image from "../../assets/loding.gif"

const AuthLoader = () => {
  return (
    <div className="w-full flex justify-center bg-black h-[120vh] ">
        <img src={image} className='w-full h-full object-cover relative' alt="kazi bazaar" />
        <div className="absolute z-50 w-full flex flex-col items-center top-[20%] gap-5 h-full">
        <h1 className="text-secondary text-3xl w-full font-extrabold uppercase  text-center font-mono ">কাজী বাজারে আপনাকে স্বাগতম!</h1>
        <span className='text-muted-foreground text-sm ' >অনুগ্রহ পূর্বক কিছুক্ষণ অপেক্ষা করুন..!</span>
        </div>
      </div> 
  )
}

export default AuthLoader