'use client';

import React from "react";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {SessionProvider} from "next-auth/react";

const lightTheme = createTheme({
   type: 'light'
});
const darkTheme = createTheme({
    type: "dark",
})

export default function Providers({children}: {
    children: React.ReactNode
}) {
    return (
        <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
                light: lightTheme.className,
                dark: darkTheme.className
            }}
        >
            <NextUIProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </NextUIProvider>
        </NextThemesProvider>
    );
}
