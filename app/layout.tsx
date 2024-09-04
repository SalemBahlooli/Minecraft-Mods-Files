import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MineCoder",
  description: "Minecraft Mods Creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9664750731521525"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          data-cfasync="false"
          src="//pl23761258.highrevenuenetwork.com/27059c7dae4cc47987c147edf66edcfc/invoke.js"
        ></script>
      </head>
      <body className={inter.className}>
        <div>
          <nav className="fixed top-0 w-full h-30 z-[49] bg-[#941c1c] px-2 lg:px-4 flex flex-row justify-end items-center shadow-sm">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
              <Image
                src="/MineCoder.png"
                alt="MineCoder"
                height="90"
                width="150"
              />
            </div>

            <Link href="/">
              <div className="flex items-center gap-x-4 mr-10 hover:opacity-75 transition">
                <Image
                  src="/avatar.png"
                  alt="MineCoder"
                  height="80"
                  width="80"
                />
              </div>
            </Link>
          </nav>
          {children}
        </div>

        <div className=" flex justify-center mt-5 mb-5">
          <h6>غض بصرك اذا فيه اعلانات وسخة ياقليل/ة الادب</h6>
        </div>

        <div id="container-27059c7dae4cc47987c147edf66edcfc"></div>
        <Footer />
      </body>
    </html>
  );
}
