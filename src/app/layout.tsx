import Header from "@/components/Header";
import type { Metadata } from "next";
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Zl Store",
  description: "A simple e-commerce store"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
