'use client';

import React from "react";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {SessionProvider} from "next-auth/react";

const darkTheme = createTheme({
    type: "dark"
})

export default function Providers({children}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider
                    defaultTheme="system"
                    attribute="class"
                    value={{
                        dark: darkTheme.className
                    }}
                >
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    );
}
