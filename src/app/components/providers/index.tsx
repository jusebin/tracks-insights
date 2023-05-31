'use client';

import React from "react";
import {createTheme, Loading, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {SessionProvider, useSession} from "next-auth/react";
import {HomeLayout} from "@/app/components/homeLayout";
import {ClassicLayout} from "@/app/components/classicLayout";

const lightTheme = createTheme({
    type: 'light'
});
const darkTheme = createTheme({
    type: "dark",
})

export default function Providers({children}: {
    children: React.ReactNode
}) {
    const {pathname} = window.location;
    const renderLayout = () => {
        if (pathname === '/') {
            return <HomeLayout>{children}</HomeLayout>
        }

        return <ClassicLayout>{children}</ClassicLayout>
    }

    return (
        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider
                    defaultTheme="system"
                    attribute="class"
                    value={{
                        light: lightTheme.className,
                        dark: darkTheme.className
                    }}
                >
                    {renderLayout()}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    );
}
