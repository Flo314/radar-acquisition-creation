import type { Metadata } from "next";
import "./globals.css";
import "./responsive.css";
export const metadata:Metadata={title:"Radar Acquisition & Création",description:"La veille hebdomadaire de Florent sur l’acquisition, la création publicitaire, l’IA, Meta et Google.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="fr"><body>{children}</body></html>}
