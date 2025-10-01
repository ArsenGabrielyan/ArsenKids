"use client"
import SiteSection from "../ui/site-section"
import { DOWNLOADS } from "@/lib/constants/card-data"
import { Button } from "../ui/button"
import { DownloadFilters } from "@/lib/types"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { X } from "lucide-react"
import Card from "../ui/card"

const filters: Record<DownloadFilters, string> = {
     all: "Բոլորը",
     animals: "Կենդանիներ",
     "fruit-veggies": "Մրգեր և Բանջարեղեն",
     others: "Ուրիշներ"
}

export default function DownloadsSection(){
     const [currSelection, setCurrSelection] = useState<DownloadFilters>("all")
     const [search, setSearch] = useState("");
     const allDownloads = useMemo(()=>{
          const array = currSelection==='all' ? DOWNLOADS : DOWNLOADS.filter(item=>item.itemType===currSelection);
          return search==="" ? array : array.filter(item=>item.title.toLowerCase().includes(search.toLowerCase()))
     },[currSelection, search])
     return (
          <SiteSection id="downloads">
               <div className="relative w-full flex items-center justify-center flex-col">
                    <h2 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mb-5 border-b border-blue-700 w-fit text-center">Ներբեռնումներ</h2>
                    <div className="mb-5 flex justify-center items-center gap-2 w-full">
                         <Input
                              value={search}
                              onChange={e=>setSearch(e.target.value)}
                              className="w-full max-w-lg"
                              placeholder="Որոնում․․․"
                         />
                         <Button variant="ghost" size="icon" onClick={()=>setSearch("")}>
                              <X className="size-6"/>
                         </Button>
                    </div>
                    <ul className="flex justify-center flex-wrap gap-2">
                         {Object.entries(filters).map(([key, value])=>(
                              <li
                                   className={cn(currSelection===key ? "bg-rainbow-green" : "bg-rainbow-blue","py-2 px-6 tracking-wide transition-all text-center font-heading cursor-pointer hover:bg-rainbow-yellow")}
                                   key={key}
                                   onClick={()=>setCurrSelection(key as DownloadFilters)}
                              >
                                   {value}
                              </li>
                         ))}
                    </ul>
                    <div className="flex justify-center flex-row-reverse flex-wrap mt-10 gap-2.5 lg:gap-5">
                         {allDownloads.map(item=>(
                              <Card
                                   key={item.downloadName}
                                   title={item.title}
                                   imageSrc={`/downloads/${item.imageName}`}
                                   imageAlt={item.downloadName}
                                   buttonText="Ներբեռնել"
                                   buttonLink={item.fileName}
                                   variant="download"
                                   imageHeight={440}
                              />
                         ))}
                    </div>
               </div>
          </SiteSection>
     )
}