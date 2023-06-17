import {Box} from "@/app/components/box";
import {Grid, Row, Text} from "@nextui-org/react";
import CustomContainer from "@/app/components/custom-container";
import React, {useCallback} from "react";

export default function HeaderLayoutSkeleton({fakeImgRounded}: {
    fakeImgRounded?: boolean
}) {
    const pictureWidth = 235;
    const borderRadius = fakeImgRounded ? '100%' : 0;
    const renderFakeImg = useCallback(() => {
        return (
            <Box css={{
                w: `${pictureWidth}px`,
                h: `${pictureWidth}px`,
                background: '$gray100',
                borderRadius,
                "@smMax": {
                    margin: "0 auto"
                }
            }}>

            </Box>
        )
    }, [borderRadius])

    return (
        <Box css={{
            linearGradient: `180deg, $secondary 50%, transparent 100%`
        }}>
            <CustomContainer>
                <Row
                    align={"center"}
                    justify={"center"}
                    css={{
                        minHeight: "40vh",
                        "@smMax": {
                            pt: "30px"
                        }
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
                                    w: "235px"
                                },
                                p: 0
                            }}
                        >
                            {renderFakeImg()}
                        </Grid>
                        <Grid
                            css={{
                                "@smMax": {
                                    w: "100%",
                                    ta: "center"
                                },
                                "@sm": {
                                    w: "calc(100% - 235px)",
                                    pl: "35px"
                                }
                            }}
                        >
                            <Box css={{
                                w: "70px",
                                h: "20px",
                                background: "$gray100",
                                "@smMax": {
                                    margin: "0 auto"
                                }
                            }}/>

                            <Box css={{
                                w: "600px",
                                h: "60px",
                                mt: "20px",
                                background: "$gray100",
                                "@smMax": {
                                    width: "300px",
                                    ml: "auto",
                                    mr: "auto"
                                }
                            }}/>

                            <Box css={{
                                w: "200px",
                                h: "50px",
                                mt: "20px",
                                background: "$gray100",
                                "@smMax": {
                                    ml: "auto",
                                    mr: "auto"
                                }
                            }}/>
                        </Grid>
                    </Grid.Container>
                </Row>
            </CustomContainer>
        </Box>
    )
}
