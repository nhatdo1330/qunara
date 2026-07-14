import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata:Metadata={metadataBase:new URL("https://qunara.org"),title:{default:"Quantum & Buddhism — Science, Wisdom, Compassion",template:"%s | Quantum & Buddhism"},description:"Explore the harmony between quantum science, Buddhist wisdom, consciousness, and compassionate living.",openGraph:{title:"Quantum & Buddhism",description:"Where quantum meets consciousness.",type:"website"},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="font-sans antialiased"><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:bg-gold focus:p-3 focus:text-midnight">Skip to content</a><Navbar/><main id="main">{children}</main><Footer/></body></html>}
