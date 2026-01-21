import PriceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import Button from "./button";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";

export const cartList = [
{
        name: "SportsOn Product 2",
        category: "Running",
        price: 25000,
        qty: 2,
        imgUrl: "product-2.png"
},
{
        name: "SportsOn Product 3",
        category: "Running",
        price: 23000,
        qty: 3,
        imgUrl: "product-3.png"
},
{
        name: "SportsOn Product 4",
        category: "Running",
        price: 44000,
        qty:4,
        imgUrl: "product-4.png"
},
{
        name: "SportsOn Product 5",
        category: "Running",
        price: 55000,
        qty: 2,
        imgUrl: "product-5.png"

},
];



const CartPopup = () => {
    const {push} = useRouter();
    const {items, removeItem} = useCartStore()
    
    

    const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

    const handleCheckout = () => {
        push("/checkout")
    }

    return (
        <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-90 z-10">
            <div className="p-4 border-b border-gray-200 font-bold text-center">
                Shopping Cart
            </div>
            {items.length ? items.map((item, index) => (
                <div 
                key={index}
                className="border-b border-gray-200 p-4 flex gap-3">
                    <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
                        <Image
                        src={getImageUrl(item.imageUrl)}
                        width={63}
                        height={63}
                        alt={item.name}
                        className="aspect-square object-contain"
                        />
                        </div>
                    <div className="self-center">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="flex gap-3 font-medium text-xs">
                            <div>{item.qty}x</div>
                            <div className="text-primary">{PriceFormatter(item.price)}</div>
                        </div>
                    </div>
                    <Button size="small" variant="ghost" className="w-7 h-7 p-0! self-center ml-auto"
                    onClick={() => removeItem(item._id)}
                    >
                        <FiTrash2/>
                    </Button>
                    </div>
            )) : (
                <div className="text-center opacity-50 py-5">Your Shopping cart is empty</div>
            )}
            <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between font-semibold">
                    <div className="text-sm">Total</div>
                    <div className="text-primary text-xs">
                    {PriceFormatter(totalPrice)}
                </div>
            </div>
            <Button variant="dark" size="small" className="w-full mt-4" onClick={handleCheckout}>
                Checkout Now 
                <FiArrowRight/>
            </Button>
        </div>
    </div>
    );
};

export default CartPopup;