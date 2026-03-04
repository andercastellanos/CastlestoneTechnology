import { SignIn } from "@clerk/nextjs"
import Image from "next/image"

export const metadata = {
  title: "Sign In",
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4">
      <div className="mb-8 flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Castlestone Technology"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <span className="text-2xl tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Castlestone Technology
        </span>
      </div>

      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#c8a97e",
            colorBackground: "#ffffff",
            colorInputBackground: "#ffffff",
            borderRadius: "2px",
          },
          elements: {
            card: "shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[#e6dbc9]",
            formButtonPrimary:
              "bg-[#c8a97e] hover:bg-[#b69468] text-white rounded-sm",
          },
        }}
      />
    </div>
  )
}
