import { productsAction } from '@/action/products';
import Products from '@/components/Products';
import Sort from '@/components/Sort'
import { ProductsAction } from '@/type/global';
async function page() {
    const products: ProductsAction = await productsAction();
    return (<div className='container flex py-6'>
        <Sort />
        <Products data={products.data} />
    </div>);
}

export default page;