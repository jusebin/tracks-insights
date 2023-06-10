import {Box} from "@/app/components/box";
import {Card, Grid, Spacer} from "@nextui-org/react";
import React, {ReactElement} from "react";

export default function GridArraySkeleton({fakeImgRounded}: {
    fakeImgRounded?: boolean
}) {
    const renderFakeCards = () => {
        const tpl: ReactElement[] = [];

        for (let i = 0; i < 6; i++) {
            tpl.push(
                <Grid xs={6} sm={3} md={2}>
                    <Box css={{
                        width: "100%"
                    }}>
                        <Card>
                            <Card.Body>
                                <Box css={{
                                    width: "100%",
                                    h: 0,
                                    pb: "100%",
                                    background: "$gray100",
                                    borderRadius: fakeImgRounded ? "100%" : 0
                                }} />

                                <Box
                                    css={{
                                        w: "100%",
                                        h: "20px",
                                        mt: "10px",
                                        background: "$gray100"
                                    }}
                                />

                                <Box css={{
                                    w: "60px",
                                    h: "10px",
                                    mt: "5px",
                                    background: "$gray100"
                                }} />
                            </Card.Body>
                        </Card>
                    </Box>
                </Grid>
            )
        }

        return tpl;
    }

    return (
        <Box>
            <Box css={{
                w: "300px",
                height: "50px",
                mb: '20px',
                background: "$gray100"
            }} />
            <Spacer y={1} />
            <Grid.Container gap={2}>
                {renderFakeCards()}
            </Grid.Container>
        </Box>
    )
}
