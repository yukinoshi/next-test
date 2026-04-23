import { authAction } from "@/action/user";
import Cart from "@/components/Cart";

async function Page() {
    const authdata = await authAction();
    return <Cart status={authdata.status} />;
}

export default Page;