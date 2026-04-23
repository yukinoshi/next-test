import NotAccount from "@/components/NotAccount";
import Account from "@/components/Account";
import { authAction } from "@/action/user";
import { AddressAction } from "@/action/address";


async function Page() {
    const auth = await authAction()
    const address = await AddressAction(auth.data?.userid)
    return (<>
        {
            // 这里简单通过cookie中是否有token来判断用户是否登录，实际项目中可能需要更复杂的逻辑
            auth.status === 200 && auth.data ? <Account authData={auth.data} addressData={address.data} /> : <NotAccount />
        }
    </>);
}

export default Page;