import Link from "next/link";
import { Title, NavList } from "@/lib/constant";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";


function Footer() {
    return (
        <div className="border-t mt-6">
            <div className="container py-32 flex justify-between">
                <h2 className="text-2xl">
                    <Link href="/">{Title}</Link>
                </h2>
                <div className="flex gap-10">
                    {NavList.map((nav, index) => (
                        <Fragment key={nav.title}>
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
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Footer;