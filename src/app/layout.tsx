import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import "material-symbols";
import Footer from "@/app/components/footer"
import Header from "@/app/components/header"
import qs from "qs";
import { fetchData } from "./utils/api";

interface Image {
  url: string,
}

interface Meta {
  siteName: string,
  siteDescription: string,
  favicon: Image
}

const plex = IBM_Plex_Sans({
  weight: ['400', '600'],
  subsets: ["latin"],
});

export async function generateMetadata() {
  const query = qs.stringify({
    populate: {
      'favicon': {
        fields: ['url'],
      },
    },
  })

  const strapiData:any = await fetchData("global?" + query)
  const meta:Meta = strapiData.data

  return {
    title: meta.siteName || "lego::lab Karlsruhe",
    description: meta.siteDescription || "lego::lab Karlsruhe | Hochschule Karlsruhe",
    icons: {
      icon: `https://www.legolab-karlsruhe.de${meta.favicon.url}` || "/favicon.ico",
    },
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={plex.className}>
        <Header />
        <main className="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
