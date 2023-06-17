import React, {ReactElement} from "react";
import {Col, Row} from "@nextui-org/react";
import {Box} from "@/app/components/box";

export default function ColValueTitleSkeleton({colValueNb}: {
    colValueNb: number
}) {
    const renderColValue = () => {
        if (!colValueNb) {
            return null;
        }

        const tmp: ReactElement[] = [];
        for (let i = 0; i < colValueNb; i++) {
            tmp.push(
                <Col>
                    <Box>
                        <Box css={{
                            d: "block",
                            w: "150px",
                            h: "30px",
                            m: "0 auto",
                            background: "$gray100",
                            "@smMax": {
                                w: "65px"
                            }
                        }} />
                        <Box css={{
                            d: "block",
                            w: "180px",
                            h: "20px",
                            m: "10px auto 0",
                            background: "$gray100",
                            "@smMax": {
                                w: "80px"
                            }
                        }} />
                    </Box>
                </Col>
            )
        }

        return tmp;
    }

    return (
        <Row css={{
            "@smMax": {
                pt: "40px"
            }
        }}>
            {renderColValue()}
        </Row>
    )
}
