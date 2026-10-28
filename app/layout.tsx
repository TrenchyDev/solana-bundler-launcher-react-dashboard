import type { Metadata } from "next"
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google"
import { DemoBanner } from "@/components/demo-banner"
import { Providers } from "@/components/providers"
import { TopBar } from "@/components/top-bar"
import { Toaster } from "@/components/ui/toast"
import { ConfirmHost } from "@/components/ui/confirm"
import { chain } from "@/lib/chain"
import { suiteItem } from "@/lib/suite"
import "./globals.css"

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-app-sans" })
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-app-mono" })

const BP = `try{var h=location.host;var T=[{m:"nakaloco",n:"Nakaloco",a:"#7c9cff"},{m:"polaris",n:"Polaris",a:"#0f8a7c"}];var b=null;for(var i=0;i<T.length;i++){if(h.indexOf(T[i].m)>=0){b=T[i];break}}if(b){document.documentElement.style.setProperty("--brand",b.a);window.__brand=b.n}}catch(e){}`

const DESCRIPTION = `${(chain as { description?: string }).description ?? `${(chain as { features?: { sameBlock?: boolean } }).features?.sameBlock ? "Launch, bundle and trade" : "Launch and trade"} ${chain.launchpad} coins with Aeon Launcher`}${process.env.NEXT_PUBLIC_DEMO === "1" ? ", from your browser" : ""}.`
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? suiteItem(chain.suiteId)?.url ?? "http://localhost:3000"),
  openGraph: { type: "website", siteName: "Aeon Launcher", title: `${chain.appName} · Aeon Launcher`, description: DESCRIPTION, images: [{ url: "/og.png", width: 1280, height: 640, alt: `${chain.appName} · Aeon Launcher` }] },
  twitter: { card: "summary_large_image", title: `${chain.appName} · Aeon Launcher`, description: DESCRIPTION, images: ["/og.png"] },
  title: { default: `${chain.appName} · Aeon Launcher`, template: `%s · ${chain.appName}` },
  description: DESCRIPTION,
  icons: { icon: "/icon.svg" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: BP }} /></head>
      <body className="bg-background text-foreground min-h-dvh font-sans antialiased">
        <Providers>
          <TopBar />
          <DemoBanner />
          <main className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-6 sm:py-6">{children}</main>
          <Toaster />
          <ConfirmHost />
        </Providers>
      </body>
    </html>
  )
}
