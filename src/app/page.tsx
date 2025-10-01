import PageLayout from "@/components/layout";
import AboutSection from "@/components/sections/about";
import HeroSection from "@/components/sections/hero";

export default function Home() {
  
  return (
    <PageLayout>
      <HeroSection/>
      <AboutSection/>
    </PageLayout>
  );
}
