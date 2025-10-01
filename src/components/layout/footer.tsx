"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import {SiYoutube, SiGithub} from "react-icons/si"

export default function Footer(){
     const year = new Date().getFullYear();
     return (
          <footer className="py-2 px-2 md:px-5 lg:px-10 border-t shadow-sm w-full font-heading flex justify-between items-center gap-2 flex-col md:flex-row">
               <div className="text-center">
                    <p className="text-foreground text-lg">&copy; {year} <Link href="https://www.youtube.com/channel/UCjc4z_ffsAv44VGfh6EjgWQ" className="text-blue-500 hover:underline underline-offset-4 font-medium text-xl">ArsenKids</Link> | Բոլոր իրավունքները պաշտպանված են</p>
               </div>
               <div className="">
                    <Button variant="ghost" asChild className="text-blue-500 size-10 rounded-sm" title="Բաժանորդագրվել Յութուբում">
                         <Link href="https://www.youtube.com/channel/UCjc4z_ffsAv44VGfh6EjgWQ"><SiYoutube className="size-6"/></Link>
                    </Button>
                    <Button variant="ghost" asChild className="text-blue-500 size-10 rounded-sm" title="Դիտել GitHub-ում">
                         <Link href="https://github.com/ArsenGabrielyan/ArsenKids"><SiGithub className="size-6"/></Link>
                    </Button>
               </div>
          </footer>
     )
}