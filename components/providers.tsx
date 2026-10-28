"use client"

import { ThemeProvider } from "next-themes"
import { BrandProvider } from "./brand-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange enableColorScheme>
      <BrandProvider>{children}</BrandProvider>
    </ThemeProvider>
  )
}
