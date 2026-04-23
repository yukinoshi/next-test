'use server'
import db from "@/lib/db";
import { Product, ProductsAction,ProductAction } from "@/type/global";

export async function productsAction(): Promise<ProductsAction> {
    // Implementation for fetching products
    const res = await db`SELECT * FROM "products"` as Product[];
    return {
        status: 200,
        body: "Products fetched successfully",
        data: res
    };
};

export async function productAction(id: number): Promise<ProductAction> {
    // Implementation for fetching a single product
    const res = (await db`SELECT * FROM "products" where id = ${id}`) as Product[];
    return {
        status: 200,
        body: "Product fetched successfully",
        data: res[0]
    };
};