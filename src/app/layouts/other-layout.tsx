import React from "react";
import Header from "@/app/components/header/header";
import {Box} from "@/app/components/box";
import CustomContainer from "@/app/components/custom-container";
import {Row, Grid, Spacer} from "@nextui-org/react";

export default function ItemLayout({type, children}: {
    children: React.ReactNode
    type: 'profile' | 'not-profile'
}) {
    return (
        <>
            <Header/>
            <Box>
                <Box css={{background: 'red'}}>
                    <CustomContainer>
                        <Row
                            align={"center"}
                            justify={"center"}
                            css={{
                                minHeight: "40vh"
                            }}
                        >
                            <Grid.Container
                                alignItems={"center"}
                                gap={2}
                                css={{
                                    "@sm": {
                                        wrap: "nowrap"
                                    }
                                }}
                            >
                                <Grid
                                    css={{
                                        "@smMax": {
                                            w: "100%"
                                        },
                                        "@sm": {
                                            w: "235px",
                                            border: "1px solid blue"
                                        }
                                    }}
                                >
                                    doudou
                                </Grid>
                            </Grid.Container>
                        </Row>
                    </CustomContainer>
                </Box>

                <Spacer y={3}></Spacer>

                <CustomContainer>
                    {children}
                </CustomContainer>
            </Box>
        </>
    )
}
