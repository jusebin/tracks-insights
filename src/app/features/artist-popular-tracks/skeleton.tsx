import {Col, Row, Spacer} from "@nextui-org/react";
import React, {ReactElement} from "react";
import {Box} from "@/app/components/box";

export default function ArtistPopularTracksSkeleton() {
    const length = 5;

    const renderIterations = () => {
        const fakeTrack: ReactElement[] = [];

        for (let i = 0; i < length; i++) {
            fakeTrack.push(
                <>
                    <Row align={"center"}>
                        <Col css={{w: "50px"}}>
                            <Box css={{
                                w: "20px",
                                h: "20px",
                                mr: "50px",
                                background: "$gray100"
                            }}/>
                        </Col>
                        <Col>
                            <Row align={"center"}>
                                <Box css={{
                                    w: "32px",
                                    h: "32px",
                                    background: "$gray100"
                                }}/>
                                <Col css={{pl: "15px"}}>
                                    <Box css={{
                                        w: "100px",
                                        h: "20px",
                                        background: "$gray100",
                                        ml: "15px"
                                    }}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col css={{ta: "right"}}>
                            <Box css={{
                                d: "inline-block",
                                w: "50px",
                                h: "20px",
                                background: "$gray100"
                            }}/>
                        </Col>
                    </Row>
                    <Spacer y={1} />
                </>
            );
        }

        return fakeTrack;
    }

    return (
        <>
            <Box css={{
                w: "300px",
                height: "50px",
                mb: '20px',
                background: "$gray100"
            }} />
            {renderIterations()}
        </>
    )
}

