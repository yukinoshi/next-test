import { AddressAction } from "@/action/address";
import { authAction } from "@/action/user";
import Checkout from "@/components/Checkout";
import { redirect } from "next/navigation";

async function page() {
    const authdata = await authAction();
    const addressdata = await AddressAction(authdata.data?.userid);
    if (authdata.status !== 200 || !authdata.data) {
        redirect("/account");
    }
    return (
        <div className="container2">
            <Checkout addressData= {addressdata.data} />
        </div>
    );
}

export default page;