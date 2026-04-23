import { productAction, productsAction } from "@/action/products";
import AddCart from "@/components/AddCart";
import Image from "next/image";

export const generateStaticParams = async () => {
    const result = await productsAction();
    return result.data.map(product => ({
        id: product.id + ''
    }));
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await productAction(Number(id));
    const product = res.data;
    return (
        <div className="container flex py-6">
            <div className="w-64">
                <h2 className="font-sans text-3xl leading-10 font-bold my-8">{product.name}</h2>
                <p className="leading-10">{product.description}</p>
            </div>
            <div className="h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1280px) 50vw, (min-width: 768px) 60vw, 100vw"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                />
            </div>
            <AddCart product={product} />
        </div>
    );
}

export default Page;