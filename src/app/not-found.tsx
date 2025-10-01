import NotFoundContent from "@/components/layout/404-page";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Վայ, էջը չի գտնվել",
     icons: {
          icon: "/error.ico",
     }
}

export default function NotFound(){
     return (
          <NotFoundContent/>
     )
}