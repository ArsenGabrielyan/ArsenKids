import NotFoundContent from "@/components/layout/404-page";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Վայ, էջը չի գտնվել",
     description: "Այս էջը, որ փնտրում եք, չի գտնվել: Հնարավոր է սխալ մուտքագրել հասցեն, էջը տեղափոխվել է, կամ գոյություն չունի",
     icons: {
          icon: "/error.ico",
     }
}

export default function NotFound(){
     return (
          <NotFoundContent/>
     )
}