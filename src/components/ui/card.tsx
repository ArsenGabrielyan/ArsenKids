"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardType } from "@/lib/types";

interface CardProps {
     title: string;
     imageSrc: string;
     imageAlt: string;
     buttonText: string;
     buttonLink: string;
     description?: string;
     variant?: CardType;
     imageHeight?: number;
}

export default function Card({
     title,
     imageSrc,
     imageAlt,
     buttonText,
     buttonLink,
     description,
     variant = "service",
     imageHeight,
}: CardProps) {
     return (
          <div className="w-80 border rounded-md shadow-lg bg-card text-card-foreground p-2 flex flex-col justify-between">
               <div className={`relative ${imageHeight ? `h-[${imageHeight}px]` : "h-[250px]"}`}>
                    <Image
                         src={imageSrc}
                         alt={imageAlt}
                         width={720}
                         height={1020}
                         className="object-cover w-full h-full"
                    />
               </div>
               <div className="py-2 lg:py-4 space-y-4 w-full h-full">
                    <h3 id="title" className={`font-semibold ${variant === "download" ? "text-lg" : "text-2xl text-center"}`}>
                         {title}
                    </h3>
                    {description && <p>{description}</p>}
               </div>
               <div className="pb-2 w-full">
                    <Button variant="primary" asChild className="text-base w-full">
                         <Link href={buttonLink}>{buttonText}</Link>
                    </Button>
               </div>
          </div>
     );
}