import Button from "@/app/components/ui/button";
import { getImageUrl } from "@/app/lib/api";
import { Product } from "@/app/types";
import PriceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type TProductTableProps = {
    products: Product[]
    onDelete?: (id: string) => void;
    onEdit?: (product: Product) => void;
}


const ProductTable = ({products, onDelete, onEdit}: TProductTableProps) => {
    return(
        <div className="bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Product</th>
                        <th className="px-6 py-4 font-semibold">Category</th>
                        <th className="px-6 py-4 font-semibold">Price</th>
                        <th className="px-6 py-4 font-semibold">Stock</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                 {
                    products.map((data) => (
                        <tr key={data._id} className="border-b border-gray-200 last:border-b-0">
                            <td className="px-6 py-4 font-medium">
                                <div className="flex gap-2 items-center">
                                    <div className="aspect-square bg-gray-100 rounded-md">
                                        <Image
                                        src={getImageUrl(data.imageUrl)}
                                        width={52}
                                        height={52}
                                        alt={data.name}
                                        className= "aspect-square object-contain"
                                        />
                                    </div>
                                    <span>{data.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">
                                <div className="rounded-md bg-gray-200 px-2 py-1 w-fit">
                                    {data.category ? data.category.name : "No Category"}
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">
                                {PriceFormatter(data.price)}
                            </td>
                            <td className="px-6 py-4 font-medium">{data.stock} units</td>
                            <td className="px-6 py-7.5 flex items-center gap-3 text-gray-600">
                                <Button onClick={() => onEdit?.(data)} className="cursor-pointer" size="icon" variant="ghost" >
                                    <FiEdit2  size={20}/>
                                </Button>
                                 <Button onClick={() => onDelete?.(data._id)} className="cursor-pointer" size="icon" variant="ghost" >
                                    <FiTrash2  size={20}/>
                                </Button>
                            </td> 

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable;
