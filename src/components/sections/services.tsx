"use client"
import SiteSection from "../ui/site-section"
import { SERVICES } from "@/lib/constants/card-data"
import Card from "../ui/card"

export default function ServicesSection(){
     return (
          <SiteSection id="services">
               <div className="relative w-full flex items-center justify-center flex-col">
                    <h2 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mb-2 border-b border-blue-700 w-fit text-center">Ծառայություններ</h2>
                    <div className="flex justify-center flex-row-reverse flex-wrap mt-10 gap-3 lg:gap-5 p-3">
                         {SERVICES.map(service=>(
                              <Card
                                   key={service.type}
                                   title={service.title}
                                   imageSrc={`/cols/col-${service.type}.webp`}
                                   imageAlt={service.type}
                                   buttonText={service.linkText}
                                   buttonLink={service.link}
                                   description={service.desc}
                                   variant="service"
                              />
                         ))}
                    </div>
               </div>
          </SiteSection>
     )
}