"use client"
import { Product } from "@/type/global";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCartStore } from "@/store";

function AddCart({ product }: { product: Product }) {
    const [value, setValue] = useState<string>('');
    const { cartList, addToCart, isItemInCart, updateQuantity } = useCartStore(); // 监听购物车状态变化
    const handleValueChange = (groupValue: string[]) => {
        setValue(groupValue[0]);
    }
    const handleClick = () => {
        const index = isItemInCart(product.name, value);
        if (index < 0) {
            addToCart({
                product,
                selectedVariant: value,
                quantity: 1
            })
        } else {
            updateQuantity(index, cartList[index].quantity + 1);
        }
        setValue(''); 
    }
    return (
        <div className="w-80 py-12">
            <h3>Select</h3>
            <ToggleGroup value={[value]} onValueChange={handleValueChange} className="justify-start py-6 border-b mb-6" variant="outline" >
                {product.variant.map((item,i) => (
                    <ToggleGroupItem className="px-4 bg-slate-50 mr-3" key={i} value={item}>
                        {item}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            <h3>Price</h3>
            <p className="text-2xl font-bold text-red-400 mb-6">${product.price}</p>
            <Button disabled={value === ''} onClick={handleClick}>Add to Cart</Button>
        </div>
    );
}

export default AddCart;