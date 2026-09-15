"use client"
import SiteSection from "../ui/site-section"
import { Button } from "../ui/button"
import { DownloadItemType, ICard, SearchFilterType } from "@/lib/types"
import { useCallback, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { X } from "lucide-react"
import { DownloadCard } from "../ui/card"
import { useLocale, useTranslations } from "next-intl"

type DownloadFilters = SearchFilterType<DownloadItemType>

const filters: DownloadFilters[] = ["all", "animals", "fruit-veggies", "others"]

interface DownloadsSectionProps{
     data: ICard<"download">[]
}
export default function DownloadsSection({data}: DownloadsSectionProps){
     const [currSelection, setCurrSelection] = useState<DownloadFilters>("all")
     const [search, setSearch] = useState("");
     const t = useTranslations("downloads");
     const searchTxt = useTranslations("search")
     const locale = useLocale()
     const getTitle = useCallback((data: ICard<"download">)=>t(`downloadTitle`,{
          itemName: data.title[locale]
     }),[t])
     const allDownloads = useMemo(()=>
          data.filter(item=>currSelection==="all" || item.itemType===currSelection).filter(item=>getTitle(item).toLowerCase().includes(search.toLowerCase()))
     ,[currSelection, search, getTitle])
     return (
          <SiteSection id="downloads">
               <div className="relative w-full flex items-center justify-center flex-col">
                    <h2 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mb-5 border-b border-blue-700 w-fit text-center">{t("title")}</h2>
                    <div className="mb-5 flex justify-center items-center gap-2 w-full">
                         <Input
                              value={search}
                              onChange={e=>setSearch(e.target.value)}
                              className="w-full max-w-lg"
                              placeholder={searchTxt("placeholder")}
                              aria-label="search"
                         />
                         {search!=="" && (
                              <Button variant="ghost" size="icon" onClick={()=>setSearch("")}>
                                   <X className="size-6"/>
                              </Button>
                         )}
                    </div>
                    <ul className="flex justify-center flex-wrap gap-2">
                         {filters.map(filter=>(
                              <li
                                   className={cn(currSelection===filter ? "bg-rainbow-green" : "bg-rainbow-blue","py-2 px-6 tracking-wide transition-all text-center font-heading cursor-pointer hover:bg-rainbow-yellow")}
                                   key={filter}
                                   onClick={()=>setCurrSelection(filter)}
                              >
                                   {t(`filters.${filter}`)}
                              </li>
                         ))}
                    </ul>
                    <div className="flex justify-center flex-row-reverse flex-wrap mt-10 gap-3 lg:gap-5 p-3">
                         {allDownloads.length>0 ? allDownloads.map(item=>(
                              <DownloadCard
                                   key={item.downloadName}
                                   data={item}
                              />
                         )) : (
                              <p className="text-xl text-muted-foreground font-heading">{searchTxt("noResults")}</p>
                         )}
                    </div>
               </div>
          </SiteSection>
     )
}