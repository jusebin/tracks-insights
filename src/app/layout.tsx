import React from "react";
import Providers from "@/app/components/providers";


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
            <Providers>
                {children}
            </Providers>
        </body>
    </html>

  )
}
