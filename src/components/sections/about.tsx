"use client"
import Image from "next/image"
import SiteSection from "../ui/site-section"
import { isChristmas } from "@/lib/helpers"
import { useIsMobile } from "@/hooks/use-mobile"

export default function AboutSection(){
     const isMobile = useIsMobile()
     return (
          <SiteSection id="about">
               <div className="relative w-full flex justify-between items-center flex-col lg:flex-row">
                    <div className="relative w-full lg:w-1/2 space-y-2.5">
                         <h2 className="text-blue-700 font-bold text-4xl pb-2 mb-2 border-b border-blue-700 w-fit">Մեր Մասին</h2>
                         <p><span className="font-medium">ArsenKids</span>-ը նախատեսված է երեխաներին, փոքրիկներին և ընտանիքներին ներգրավելու համար <span className="font-medium">կրթական տեսանյութերի միջոցով</span> (օրինակ՝ Սովորենք հաշվել, այբուբենը, գույներ) և <span className="font-medium">ստոպ կադր կրթական անիմացիաների միջոցով</span>: Այն մշակվել է երեխաների համար, բայց նաև սիրում են ծնողները:</p>
                         <p><span className="font-medium">ArsenKids</span>-ը ուսուցանում է <span className="font-medium">սոցիալական հմտություններ</span>, ուսուցողական վիդեոների միջոցով ամրացնում է <span className="font-medium">կապը ծնողների հետ</span>, հարստացնում <span className="font-medium">բառապաշարն ու հիշողությունը</span>: Մեր տեսանյութերը երեխաներին սովորեցնում են <span className="font-medium">բարոյական արժեքներ</span>, և այս տեսանյութերը և՛ զվարճալի են, և՛ ուսուցողական: Հուսով ենք, որ այս տեսանյութերը <span className="font-medium">մեծ ուրախություն կբերեն</span> ձեր երեխաներին, փոքրիկներին և ընտանիքին:</p>
                         <p>Մեր ստոպ կադր անիմացիոն տեսանյութերը հիանալի հարմարեցված են <span className="font-medium">իրենց զարգացման համար</span>, և երեխաները հաճույքով <span className="font-medium">նոր բաներ են սովորում</span>` դիտելով տեսանյութերն ու մեր խնամքով ընտրված փլեյլիստները: <span className="font-medium">ArsenKids</span>-ը առայժմ հասանելի է հայերենով:</p>
                    </div>
                    <div className="relative w-full lg:w-1/2">
                         <div className="relative w-full flex justify-center items-center min-h-80">
                              <Image src={`/logos/${isChristmas() ? "logo-christmas" : "logo"}.webp`} alt="ArsenKids" width={isMobile ? 300 : 256} height={isMobile ? 300 : 256} id="arsenkids-logo" className="rounded-md object-cover"/>
                         </div>
                    </div>
               </div>
          </SiteSection>
     )
}