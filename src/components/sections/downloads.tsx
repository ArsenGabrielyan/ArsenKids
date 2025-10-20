"use client"
import SiteSection from "../ui/site-section"
import { DOWNLOADS } from "@/lib/constants/card-data"
import { Button } from "../ui/button"
import { DownloadItemType, SearchFilterType } from "@/lib/types"
import { useCallback, useMemo, useState } from "react"
import { absoluteCDN, cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { X } from "lucide-react"
import Card from "../ui/card"
import { useTranslations } from "next-intl"
import { Downloads } from "@/lib/types/enums"

type DownloadFilters = SearchFilterType<DownloadItemType>

const filters: DownloadFilters[] = ["all", "animals", "fruit-veggies", "others"]

export default function DownloadsSection(){
     const [currSelection, setCurrSelection] = useState<DownloadFilters>("all")
     const [search, setSearch] = useState("");
     const t = useTranslations("downloads");
     const buttonText = useTranslations("buttons");
     const searchTxt = useTranslations("search")
     const getDownloadsTranslation = useCallback((downloadName: Downloads) =>
          t("downloadTitle",{itemName: t(`downloads-list.${downloadName}`)}),[t])
     const allDownloads = useMemo(()=>
          DOWNLOADS
               .filter(item=>currSelection==="all" || item.itemType===currSelection)
               .filter(item=>getDownloadsTranslation(item.downloadName).toLowerCase().includes(search.toLowerCase()))
     ,[currSelection, search, getDownloadsTranslation])
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
                              <Card
                                   key={item.downloadName}
                                   title={getDownloadsTranslation(item.downloadName)}
                                   imageSrc={`/downloads/${item.imageName}`}
                                   imageAlt={item.downloadName}
                                   buttonText={buttonText("download.original")}
                                   buttonLink={absoluteCDN("pdf",`/${item.fileName}`)}
                                   variant="download"
                              />
                         )) : (
                              <p className="text-xl text-muted-foreground font-heading">{searchTxt("noResults")}</p>
                         )}
                    </div>
               </div>
          </SiteSection>
     )
}