"use client"
import { cn } from "@/lib/utils";
import {Link} from "@/i18n/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "../logo";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../language-switcher";
import { NavLinks } from "@/lib/types/enums";

const links = [
     {url: "/#banner", name: NavLinks.Homepage},
     {url: "/#about", name: NavLinks.About},
     {url: "/#services", name: NavLinks.Services},
     {url: "/#downloads", name: NavLinks.Downloads},
     {url: "/#contact", name: NavLinks.Contact},
     {url: "/games", name: NavLinks.Games},
]

export default function Header(){
     const isMobile = useIsMobile();
     const [isOpen, setIsOpen] = useState(false);
     const [isSticky, setIsSticky] = useState(false);
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
     const t = useTranslations("nav-links")
     return (
          <header className={cn("fixed top-0 left-0 flex justify-between items-center w-full px-6 lg:px-15 z-10 transition-all",isSticky && "bg-white shadow-sm gap-2", isSticky ? "py-4" : "py-4 lg:py-10")}>
               <Link href="/" title={t("home")}>
                    <Logo src={logo} width={isMobile ? 210 : 250} height={isMobile ? 20 : 60}/>
               </Link>
               {isMobile && (
                    <Button variant="ghost" className="relative size-10" onClick={()=>setIsOpen(!isOpen)}>
                         {isOpen ? <X className={cn("size-8",!isSticky ? "text-white" : "text-black")}/> : <Menu className={cn("size-8",!isSticky ? "text-white" : "text-black")}/>}
                    </Button>
               )}
               <ul className={cn("w-full lg:w-fit h-[calc(100%_-_84px)] lg:h-fit fixed lg:relative top-[84px] lg:top-auto left-0 lg:left-auto gap-7 lg:gap-5 flex-col lg:flex-row items-center justify-center bg-white lg:bg-transparent",isOpen ? "flex" : "hidden lg:flex")}>
                    {links.map(link => (
                         <li key={link.url} className="font-medium lg:font-[350]">
                              <Link
                                   href={link.url}
                                   className={cn("text-3xl lg:text-base xl:text-lg text-center transition-all font-heading",isSticky ? "text-black hover:text-blue-500" : "text-black lg:text-white  hover:text-blue-500 lg:hover:text-rainbow-green")}
                                   onClick={()=>setIsOpen(false)}
                              >
                                   {t(link.name)}
                              </Link>
                         </li>
                    ))}
                    {isMobile && (
                         <li className="font-medium lg:font-[350]">
                              <LanguageSwitcher/>
                         </li>
                    )}
               </ul>
               {!isMobile && <LanguageSwitcher/>}
          </header>
     )
}