import "./globals.css"
import { AppProviders } from "./providers"

export const metadata = {
  title: "Calculadora de Membresías | Exotic Travelers",
  description: "Membership calculator for Exotic Travelers.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-[#F7FBF9] text-[#143F46]">
        <AppProviders>
          <main className="min-h-screen bg-[linear-gradient(180deg,#F7FBF9_0%,#FFFFFF_42%,#F7FBF9_100%)] p-6">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  )
}
