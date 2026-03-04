import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import PortalSidebar from "@/components/portal/PortalSidebar"

export const metadata = {
  title: {
    default: "Portal",
    template: "%s | Castlestone Portal",
  },
}

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#faf8f5]">
      <PortalSidebar />
      {/* pt-14 offsets the fixed mobile top bar; lg:pt-0 resets on desktop */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
