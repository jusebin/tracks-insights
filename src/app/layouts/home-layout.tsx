import React from "react";
import {Container} from "@nextui-org/react";
import {Box} from "@/app/components/box";
import {useTranslations} from "use-intl";

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
                position: "relative",
                background: "linear-gradient(180deg, $black 20%, $secondary 100%)",
            }}
        >
            <Box>
                {children}
            </Box>
        </Container>
    );
}
