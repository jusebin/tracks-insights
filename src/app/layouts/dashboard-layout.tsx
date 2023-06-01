'use client';

import React from "react";
import {Navbar, Text, Switch, useTheme} from "@nextui-org/react";
import {useTheme as useNextTheme} from 'next-themes'
import {SvgIcon} from "@/app/components/svgIcon";
import Header from "@/app/components/header/header";

export function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
        </>
    )
}
