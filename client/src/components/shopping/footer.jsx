import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import FooterCard from './FooterCard';
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";


const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container">
        {/* footer infos */}
        <div className="flex  flex-wrap space-y-4 pb-10 pt-8   border-b justify-between items-center">
          <FooterCard
            image="/icons/f1.svg"
            title="Free Shopping"
            subtitle="For All Orders over $200"
          />
          <FooterCard
            image="/icons/f2.svg"
            title="1 & 1 Returns"
            subtitle="Cancellation after 1 day"
          />
          <FooterCard
            image="/icons/f3.svg"
            title="100% Secure Payment"
            subtitle="Gurantee secure payments"
          />
          <FooterCard
            image="/icons/f4.svg"
            title="24/7 Dedicated Support"
            subtitle="Anywhere & anytime"
          />
          <FooterCard
            image="/icons/f5.svg"
            title="Daily Offers"
            subtitle="Discount up to 70% OFF"
          />
        </div>

        {/* footer widgets */}
        <div className="my-10 flex flex-wrap gap-10 justify-between">
          <div className="max-w-sm">
            <h2 className="text-xl mb-5 font-bold">
              kazi Bazaar – Your Online Foods & Grocery
            </h2>
            <p>
              Kazi Bazar is a leading e-commerce platform committed to delivering safe,
              healthy, and organic food products across Bangladesh.
              Renowned for its dedication to quality, Kazi Bazar offers a diverse range of
              health-focused items, including premium mustard oil, pure ghee, organic honey,
              dates, chia seeds, and an assortment of nuts.
              Each product is carefully sourced and crafted to ensure maximum health benefits,
              meeting the highest standards of purity and freshness.
            </p>
            <span className="flex">
              <FiPhoneCall className="text-color mt-[5px] " />
              <div className=" ml-4">
                <p className="">Hotline 24/7</p>
                <h3 className="text-2xl font-bold">
                  {" "}
                  <a href="tel:+8801921563031"> (+880) 1921-563031</a>
                </h3>
              </div>
            </span>
            <span className="flex mt-5">
              <AiOutlineHome className="text-color mt-[5px] " />
              <address className=" ml-4">
                <p className="">Merull Badda, Dhaka-1212 Bangladesh </p>
              </address>
            </span>
            <span className="flex mt-5">
              <HiOutlineMail className="text-color mt-[5px] " />
              <div className=" ml-4">
                <p className="">
                  <a href="mailto:dev.amirhamza@gmail.com">
                    {" "}
                    dev.amirhamza@gmail.com
                  </a>
                </p>
              </div>
            </span>
          </div>
          {/* Links  */}
          <div className="">
            <h2 className="text-lg mb-6 font-bold">Useful Links</h2>
            <div className="">
              <ul>
                <FooterLink href="/" text="About Us" />
                <FooterLink href="/" text="Contact" />
                <FooterLink href="/" text="Help Center" />
                <FooterLink href="/" text="Career" />
                <FooterLink href="/" text="Policy" />
                <FooterLink href="/" text="Flash Sale" />
                <FooterLink href="/" text="Official" />
                <FooterLink href="/" text="Sitemap" />
              </ul>
            </div>
          </div>
          {/* Links  */}
          <div className="">
            <h2 className="text-lg mb-6 font-bold">Help Center</h2>
            <div className="">
              <ul>
                <FooterLink href="/" text="Payments" />
                <FooterLink href="/" text="Shipping" />
                <FooterLink href="/" text="Shipping" />
                <FooterLink href="/" text="FAQr" />
                <FooterLink href="/" text="Checkout" />
                <FooterLink href="/" text="Other Issues" />
              </ul>
            </div>
          </div>
          {/* Links  */}

          {/* News */}
          <div className="max-w-sm">
            <h2 className="text-lg mb-6 font-bold">Farmart Busines</h2>
            <p className="text-color">
              Register now to get updates on promotions and coupns. Don&apos;t worry!
              We not spam
            </p>
            <div className="flex items-center  mt-5">
              <div className="flex justify-center w-full  items-center border p-4 rounded">
                <HiOutlineMail className="text-title text-2xl  " />
                <input
                  type="text"
                  placeholder="Your email..."
                  className="outline-none relative bg-transparent w-full px-4 "
                />
              </div>
              <Button
                className="self-stretch py-7 absolute right-1 items-center" 
              > Subscribe </Button>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="py-8 flex flex-wrap space-y-3 justify-center md:justify-between items-center border-t">
          <p className="text-sm">&copy; {new Date().getFullYear()}
            <a className="" href="https://amirhamzadev.com"> Developed by <b>Amir Hamza</b>  </a>  No rights reserved, Build for practice. </p>
          <img src="./image/footer-new-payment.png" alt="" />
        </div>
      </div>
    </footer>
  );
};
const FooterLink = ({ href = "/", text }) => (
  <li className="mb-2 text-color hover:text-primary ">
    <Link href={href}>{text} </Link>
  </li>
);

export default Footer