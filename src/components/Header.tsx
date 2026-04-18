import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Title, MenuList } from "@/lib/constant";
function Header() {
    return (
        <div className="h-16 border-b px-10 bg-white">
            <div className="container flex items-center justify-between h-full">
                <h1 className="text-2xl">
                    <Link href="/">{Title}</Link>
                </h1>
                <div className="flex justify-end space-x-4 text-sm">
                    {MenuList.map((item, index) => <>
                        <Link key={item.href} href={item.href}>
                            {item.text}
                        </Link>
                        {index !== MenuList.length - 1 ? <Separator orientation="vertical" /> : null}
                    </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;