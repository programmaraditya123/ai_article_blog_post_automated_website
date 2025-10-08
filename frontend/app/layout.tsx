
import NavBar from "@/components/shared/Navbar";
import styles from './page.module.css'
import { Metadata } from "next";
import Footer from "@/components/shared/Footer/Footer";
import Script from "next/script";
 

export const metadata: Metadata = {
  title: {
    default: "Knowledge Poll - Learn Programming, Coding & Real Projects",
    template: "%s | Knowledge Poll",
  },
  description:
    "Boost your coding journey with Knowledge Poll 🚀. Learn programming, master coding concepts, and build hands-on projects with structured tutorials and guides.",
  keywords: [
    "Learn programming",
    "Coding tutorials",
    "Programming projects",
    "Web development",
    "JavaScript",
    "React",
    "Python",
    "Full-stack development",
    "Coding for beginners",
    "Practical coding exercises",
  ],
  metadataBase: new URL("https://knowledgepoll.site"),
  alternates: {
    canonical: "https://knowledgepoll.site",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://knowledgepoll.site",
    siteName: "Knowledge Poll",
    title: "Knowledge Poll - Learn Programming, Coding & Real Projects",
    description:
      "Master coding step by step with Knowledge Poll. From beginner programming to advanced projects – grow your skills with interactive guides.",
    images: [
      {
        url: "https://knowledgepoll.site/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Knowledge Poll - Learn Programming",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Knowledge Poll - Learn Programming, Coding & Real Projects",
    description:
      "Kickstart your coding journey! Learn programming, solve coding problems, and build real-world projects at Knowledge Poll.",
    images: ["https://knowledgepoll.site/seo/twitter-image.png"],
    creator: "@KnowledgePoll",
  },

  icons: {
    icon: "/brand.png",
    shortcut: "/brand.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Education",
};


export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
       <head>
        {/* ✅ Use Next.js Script instead of raw <script> */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4617056155363384"
          crossOrigin="anonymous"
        />
      </head>
    
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
