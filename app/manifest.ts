import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ЦЕНТР ПОЖТЕХНИКА - Установка пожарных систем",
    short_name: "ЦЕНТР ПОЖТЕХНИКА",
    description: "Профессиональная установка и обслуживание пожарных систем",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#E53935",
    icons: []
  }
}

