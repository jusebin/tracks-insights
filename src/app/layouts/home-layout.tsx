import React from "react";
import {Container} from "@nextui-org/react";
import Canvas from "@/app/features/canvas";
import {Box} from "@/app/components/box";

export default function HomeLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <Container
            display={'flex'}
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
            fluid
            css={{
                height: '100vh',
                position: "relative"
            }}
        >
            <Canvas />
            <Box css={{
                position: "relative",
                background: "black",
                p: "40px"
            }}>
                {children}
            </Box>
        </Container>
    );
}
