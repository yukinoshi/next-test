import Link from "next/link";

function Header() {
    return (
        <div className="h-16 border-b px-10 bg-white">
            <div className="container flex items-center justify-between h-full">
                <h1 className="text-2xl">
                    <Link href="/">Zl Store</Link>
                </h1>
                <div className="flex justify-end space-x-4 text-sm">
                    <Link href="/search">Search</Link>
                    <Link href="/account">Account</Link>
                    <Link href="/cart">Cart</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;