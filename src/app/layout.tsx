import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata:Metadata={metadataBase:new URL("https://qunara.org"),title:{default:"Qunara — Science, Wisdom, Experience",template:"%s | Qunara"},description:"A trusted knowledge platform for quantum physics, Buddhist philosophy, consciousness, and human experience.",openGraph:{title:"Qunara",description:"Inquiry across science, wisdom, and experience.",type:"website"},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="font-sans antialiased"><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:bg-gold focus:p-3 focus:text-midnight">Skip to content</a><Navbar/><main id="main">{children}</main><Footer/></body></html>}
