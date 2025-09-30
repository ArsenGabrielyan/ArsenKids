import Footer from "./footer";
import Header from "./header";

interface PageLayoutProps{
     children: React.ReactNode
}
export default function PageLayout({children}: PageLayoutProps){
     return (
          <>
               <Header/>
               {children}
               <Footer/>
          </>
     )
}