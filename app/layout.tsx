import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"

import { Toaster } from "@/registry/xuan/ui/toast"

import "./globals.css"

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
})

export const metadata: Metadata = { title: "xuan-ui-kit registry" }

// note: Next.js App Router requires a default export for layout files.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="isolate">
        <script
          // note: applies the stored theme before first paint; an effect would flash light first.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('xuan-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        <Toaster>{children}</Toaster>
      </body>
    </html>
  )
}
