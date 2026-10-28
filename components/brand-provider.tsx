"use client"

import * as React from "react"
import { brandForHost, DEFAULT_BRAND, type Brand } from "@/lib/brand"
import { chain } from "@/lib/chain"

const Ctx = React.createContext<Brand>(DEFAULT_BRAND)
export const useBrand = (): Brand => React.useContext(Ctx)

/** Resolve the brand from the host on mount; set the wordmark, accent, title. */
export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = React.useState<Brand>(DEFAULT_BRAND)
  React.useEffect(() => {
    const b = brandForHost(location.host)
    setBrand(b)
    const root = document.documentElement
    const acc = (chain as { accent?: string }).accent || b.accent
    if (acc) root.style.setProperty("--brand", acc)
    if (b.name !== DEFAULT_BRAND.name) document.title = document.title.replace(DEFAULT_BRAND.name, b.name)
    root.dataset.brand = b.name.toLowerCase()
  }, [])
  return <Ctx.Provider value={brand}>{children}</Ctx.Provider>
}
