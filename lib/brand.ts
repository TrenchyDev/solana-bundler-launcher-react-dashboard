/** Host -> brand. One deployment wears every persona: the host picks the name,
 *  accent and links at runtime, so a new persona is a DNS record + a row here
 *  (no redeploy). Chain stays per-app; brand is per-host. */
export type Brand = {
  name: string
  label: string
  accent: string
  domain?: string
  x?: string
  hosts: string[]
}
export const DEFAULT_BRAND: Brand = { name: "Aeon", label: "Launcher", accent: "#a3e635", domain: "aeonlauncher.xyz", hosts: ["aeonlauncher.xyz"], x: "aeon" }
export const BRANDS: Brand[] = [
  DEFAULT_BRAND,
  { name: "Nakaloco", label: "Launcher", accent: "#7c9cff", domain: "nakaloco.dev", x: "nakaloco", hosts: ["nakaloco.dev", "nakaloco.xyz"] },
  { name: "Polaris", label: "Launcher", accent: "#0f8a7c", domain: "polarislauncher.xyz", x: "polaris", hosts: ["polarislauncher.xyz"] },
]
/** The brand a host wears; bare / localhost / unknown -> the default. Longest suffix wins. */
export function brandForHost(host: string): Brand {
  const h = (host || "").toLowerCase().replace(/:\d+$/, "")
  let best: Brand | null = null
  for (const b of BRANDS) for (const suf of b.hosts) {
    if (h !== suf && !h.endsWith("." + suf)) continue
    if (!best || suf.length > (best.hosts[0]?.length ?? 0)) best = b
  }
  return best ?? DEFAULT_BRAND
}
