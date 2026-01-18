"use client";

import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import CartPopup from "../ui/cart-popup";
import { useState } from "react";
import Button from "../ui/button";


const Header = () => {
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false)

    return (
    <header>
        <div className="flex justify-between gap-10 container mx-auto py-7">
       <Image 
       src= "/images/logo.svg"
       alt="sporton logo"
       width={127}
       height={30}
       />
       <nav className="flex gap-44 font-medium">
        <Link href="#"className="relative after:content-[''] after:block after:bg-primary after:rounded-full after:h-[3px] after:w-2/3 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1">HOME</Link>
        <Link href="#">Category</Link>
        <Link href="#">Explore Product</Link>
   </nav>
   <div className="relative flex gap-10">
    <FiSearch size={24} />
    <Button 
      className="relative cursor-pointer"
      onClick={()=> setIsCartPopupOpen (!isCartPopupOpen)}
      >
    <FiShoppingBag size={24}/>
     <div className="bg-primary rounded-full w-3.5 h-3.5 absolute -top-1 -right-1 text-[10px] text-white text-center">3
         </div>
      
    </Button>
        {isCartPopupOpen && <CartPopup />}
        </div>
     </div>
   
 </header>
 
);
};

export default Header;