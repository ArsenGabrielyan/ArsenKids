"use client"
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const links = [
     {url: "/#banner", name: "Գլխավոր"},
     {url: "/#about", name: "Մեր Մասին"},
     {url: "/#services", name: "Ծառայություններ"},
     {url: "/#downloads", name: "Ներբեռնումներ"},
     {url: "/#contact", name: "Կապ"},
     {url: "/games", name: "Խաղեր"},
]

export default function Header(){
     const isMobile = useIsMobile()
     const [isOpen, setIsOpen] = useState(false);
     const [isSticky, setIsSticky] = useState(false);
     const [hovered, setHovered] = useState(false);
     const logo = useMemo(() => {
          if (!isSticky) return "/arsenkids.svg";
          return "/arsenkids-black.svg"
     }, [isSticky]);
     useEffect(()=>{
          function handleScroll(this: Window) {
               setIsSticky(this.scrollY > 20)
          }
          window.addEventListener("scroll",handleScroll)
          return () => {
               window.removeEventListener("scroll",handleScroll)
          }
     },[])
     return (
          <header className={cn("fixed top-0 left-0 flex justify-between items-center w-full py-10 px-20 z-10 transition-all",isSticky && "bg-white py-5 shadow-sm")}>
               <Link href="/" title="Գլխավոր" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    <Image src={hovered ? "/arsenkids-colorful.svg" : logo} alt="logo" width={250} height={60}/>
               </Link>
               <ul className="relative flex gap-5">
                    {links.map(link => (
                         <li key={link.url}>
                              <Link href={link.url} className={cn("transition-all font-heading text-lg",isSticky ? "text-black hover:text-link" : "text-white  hover:text-rainbow-green")}>{link.name}</Link>
                         </li>
                    ))}
               </ul>
          </header>
     )
}