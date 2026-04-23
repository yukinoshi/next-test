'use client'
import { ProductsTitle } from "@/lib/constant";
import { useSortStore } from "@/store";
import { Product } from "@/type/global";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Products({ data }: { data: Product[] }) {
    const { value } = useSortStore();
    const router = useRouter(); 
    const sortedData = [...data].sort((a, b) => {
        if (value === 'latest') {
            return b.id - a.id; // Assuming higher ID means newer product
        } else if (value === 'low') {
            return a.price - b.price; // Sort by price low to high
        } else if (value === 'high') {
            return b.price - a.price; // Sort by price high to low
        }
        return 0; // No sorting if value is unrecognized
    });
    const handleClick = (id: number) => {
        router.push(`/detail/${id}`);
    }
    return (
        <div className="flex-1">
            <h2 className="mb-8 text-4xl">{ProductsTitle}</h2>
            <div className="grid grid-cols-3 gap-4">
                {sortedData.map((product: Product) => (
                    // <div key={product.id} className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 transition duration-300 ease-in-out cursor-pointer" onClick={() => handleClick(product.id)}>
                    <div key={product.id} onClick={() => handleClick(product.id)} className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 transition duration-300 ease-in-out cursor-pointer">
                        <Image src={product.image} alt={product.name} width={300} height={300} priority />
                        <div className="flex items-center justify-between mt-4">
                            <h3 className="flex-2xl text-slate-700">{product.name}</h3>
                            <p className="text-lg font-bold text-red-400">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;