import PageLayout from "@/components/layout";
import AboutSection from "@/components/sections/about";
import ContactSection from "@/components/sections/contact";
import DownloadsSection from "@/components/sections/downloads";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";

export default function Home() {
  
  return (
    <PageLayout>
      <HeroSection/>
      <AboutSection/>
      <ServicesSection/>
      <DownloadsSection/>
      <ContactSection/>
    </PageLayout>
  );
}
