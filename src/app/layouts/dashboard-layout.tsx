'use client';

import React from "react";
import Header from "@/app/components/header/header";
import CustomContainer from "@/app/components/custom-container";
import {Box} from "@/app/components/box";

export function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <Box css={{paddingBottom: "60px"}}>
                <CustomContainer>
                    {children}
                </CustomContainer>
            </Box>
        </>
    )
}
