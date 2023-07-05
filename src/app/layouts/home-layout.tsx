import React from "react";
import {Box} from "@/app/components/box";

export default function HomeLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <Box
            css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: '100vh',
                position: "relative",
                background: "linear-gradient(180deg, $black 20%, $secondary 100%)",
                margin: 0,
                padding: 0
            }}
        >
            <Box>
                {children}
            </Box>
        </Box>
    );
}
