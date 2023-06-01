import React from "react";
import Header from "@/app/components/header/header";

export default function ItemLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
