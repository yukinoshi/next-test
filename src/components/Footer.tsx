import Link from "next/link";
import { Title, NavList } from "@/lib/constant";
import { Separator } from "@/components/ui/separator";


function Footer() {
    return (
        <div className="border-t mt-6">
            <div className="container py-32 flex justify-between">
                <h2 className="text-2xl">
                    <Link href="/">{Title}</Link>
                </h2>
                <div className="grid-cols-4 gap-10 flex">
                    {NavList.map((nav, index) => (
                        <>
                            {index !== 0 ? <Separator orientation="vertical" /> : null}
                            <div key={nav.title}>
                                <span>{nav.title}</span>
                                <ul className="m-4 space-y-3">
                                    {nav.list.map((item) => (
                                        <li key={item}>
                                            <Link href={`/${item.replace(/\s+/g, '')}`}>{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Footer;