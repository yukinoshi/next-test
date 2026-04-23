'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCartStore } from '@/store';
import { Address } from "@/type/global";
import { ArrowUpRight, Trash2 } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';

function Checkout({ addressData }: { addressData: Address[] }) {
    const [selectAddress, setSelectAddress] = useState('')
    const { cartList } = useCartStore()
    return (<>
        <div className="border-b py-4">
            <h2 className="text-lg leading-10 font-bold">Address</h2>
            {addressData.length === 0 ? (
                <div className="my-2">
                    <p>Don&#39;t have a shipping address yet?</p>
                    <div className="flex text-sm items-center underline text-orange-400">
                        <Link href="/account">Add address</Link>
                        <ArrowUpRight width={18} />
                    </div>
                </div>
            ) : (
                <div>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a address" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Address</SelectLabel>
                                {addressData.map((item) => (
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                        <div className="flex flex-col items-start gap-1 py-1">
                                            <h3 className="font-bold">{item.name}</h3>
                                            <p>city: {item.city}</p>
                                            <p>address: {item.address}</p>
                                            <p>phone: {item.phone}</p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
        <div className="border-b py-4">
            <h2 className="text-lg leading-10 font-bold">Cart</h2>
            {
                cartList.length === 0 ? (
                    <div className="my-2">
                        <p>Your cart is empty.</p>
                        <div className="flex text-sm items-center underline text-orange-400">
                            <Link href="/">Start shopping</Link>
                            <ArrowUpRight width={18} />
                        </div>
                    </div>
                ) : (
                    <div className="py-8 px-2 space-y-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[400px]">Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cartList.map((cartItem, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Image
                                                        src={cartItem.product.image}
                                                        alt={cartItem.product.name}
                                                        width={64}
                                                        height={64}
                                                        priority
                                                        style={{
                                                            width: '64px',
                                                            height: '64px',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                    <div className="ml-4 space-y-1">
                                                        <p className="text-sm font-medium">{cartItem.product.name}</p>
                                                        <p className="text-xs text-gray-400">{cartItem.selectedVariant}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{cartItem.quantity}</TableCell>
                                            <TableCell>{cartItem.product.price}</TableCell>
                                            <TableCell className="text-right">${cartItem.product.price * cartItem.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        <div className="w-full flex items-center justify-end gap-3">
                            <h2 className="font-sans font-medium text-base">
                                Total
                            </h2>
                            <p className="text-3xl font-bold text-red-400">${cartList.reduce((acc, cartItem) => acc + cartItem.product.price * cartItem.quantity, 0).toFixed(2)}</p>
                        </div>
                    </div>
                )
            }
        </div>
    </>);
}

export default Checkout;