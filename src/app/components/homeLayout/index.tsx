'use client';

import React from "react";
import {Container} from "@nextui-org/react";

export function HomeLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <Container
            display={'flex'}
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
            fluid
            css={{height: '100vh'}}
        >
            {children}
        </Container>
    );
}
