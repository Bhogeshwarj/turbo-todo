import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_component/header";
const inter = Inter({ subsets: ["latin"] });



export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div>
    <Header/>
  <div className={inter.className} >{children} </div>
</div>

  );
}
