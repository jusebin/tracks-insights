import React from "react";
import {Container} from "@nextui-org/react";

export default function CustomContainer({children}: {
    children: React.ReactNode
}) {
    return (
        <Container css={{
            w: "100%",
            maxWidth: "1280px",
            boxSizing: "border-box"
        }}>
            {children}
        </Container>
    )
}
