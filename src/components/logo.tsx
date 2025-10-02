"use client"
import Image from "next/image"
import { useState } from "react";

interface LogoProps{
     width: number,
     height: number,
     src: `/arsenkids${"" | "-black"}.svg`
}
export default function Logo({width, height, src}: LogoProps){
     const [hovered, setHovered] = useState(false);
     return (
          <Image src={hovered ? "/arsenkids-colorful.svg" : src} alt="logo" width={width} height={height} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}/>
     )
}