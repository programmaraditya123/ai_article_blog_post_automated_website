
import NavBar from "@/components/shared/Navbar";
import styles from './page.module.css'
import { Metadata } from "next";
import Footer from "@/components/shared/Footer/Footer";
 
export const metadata: Metadata = {
  title: {
    default: "Knowledge Poll - Learn programming and more",
    template: "%s | Knowledge Poll",
  },
  description:
    "Knowledge Poll is your go-to platform for learning programming, coding concepts, and practical projects.",
  metadataBase: new URL("https://knowledgepoll.site"),
  alternates: {
    canonical: "https://knowledgepoll.site",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://knowledgepoll.site",
    siteName: "Knowledge Poll",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Poll - Learn programming and more",
    description:
      "Knowledge Poll is your go-to platform for learning programming, coding concepts, and practical projects.",
  },
  icons: {
    icon: '/brand.png', // favicon here
    shortcut: '/brand.png', // optional for shortcut icon
    // apple:'/brandimg.png'
  },

}; 

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
    
      <body>
        <header className={styles.navbar}>
           <NavBar/>
        </header>
        
         
        <div className={styles.main_cont}>
          <main>{children}</main>
        </div>
        <div>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
