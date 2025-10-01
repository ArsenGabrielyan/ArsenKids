"use client"
import Image from "next/image"
import SiteSection from "../ui/site-section"
import { SERVICES } from "@/lib/constants/card-data"
import { Button } from "../ui/button"
import Link from "next/link"

export default function ServicesSection(){
     return (
          <SiteSection id="services">
               <div className="relative w-full flex items-center justify-center flex-col">
                    <h2 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mb-2 border-b border-blue-700 w-fit text-center">Ծառայություններ</h2>
                    <div className="flex justify-center flex-row-reverse flex-wrap mt-10 gap-2.5 lg:gap-5">
                         {SERVICES.map(service=>(
                              <div key={service.type} className="w-80 border shadow-lg bg-card text-card-foreground p-2 flex flex-col justify-between">
                                   <div className="h-[250px] relative">
                                        <Image src={`/cols/col-${service.type}.webp`} alt={service.type} width={495} height={385} className="object-cover"/>
                                   </div>
                                   <div className="py-2 lg:py-4 space-y-4 w-full h-full">
                                        <h3 id="title" className="text-center text-2xl font-semibold">{service.title}</h3>
                                        <p>{service.desc}</p>
                                   </div>
                                   <div className="pb-2 w-full">
                                        <Button variant="primary" asChild className="text-base">
                                             <Link href={service.link}>{service.linkText}</Link>
                                        </Button>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </SiteSection>
     )
}