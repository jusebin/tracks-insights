'use client';

import React from "react";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {SessionProvider} from "next-auth/react";

const darkTheme = createTheme({
    type: "dark",
    theme: {
        colors: {
            primaryLight: '#4b4128',
            primaryLightHover: '#645736',
            primaryLightActive: '#ae985e',
            primaryLightContrast: '#f9d986',
            primary: '#F9D986',
            primaryBorder: '#c7ae6b',
            primaryBorderHover: '#F9D986',
            primarySolidHover: '#fae19e',
            primarySolidContrast: '$white',
            primaryShadow: '#c7ae6b',

            secondaryLight: '#0d1811',
            secondaryLightHover: '#274a34',
            secondaryLightActive: '#346245',
            secondaryLightContrast: '#417b56',
            secondary: '#6bb486',
            secondaryBorder: '#5bac78',
            secondaryBorderHover: '#9bf7bd',
            secondarySolidHover: '#9bf7bd',
            secondarySolidContrast: '$white',
            secondaryShadow: '#5bac78',
        }
    }
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
