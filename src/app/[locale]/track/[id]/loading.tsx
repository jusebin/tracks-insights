'use client';

import HeaderLayoutSkeleton from "@/app/features/header-layout/skeleton";
import GridArraySkeleton from "@/app/components/grid-array/skeleton";
import CustomContainer from "@/app/components/custom-container";
import {Col, Row, Spacer} from "@nextui-org/react";
import React, {ReactElement} from "react";
import {Box} from "@/app/components/box";

export default function Loading({colValueNb}: {
    colValueNb?: number
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
                            background: "$gray100"
                        }} />
                        <Box css={{
                            d: "block",
                            w: "200px",
                            h: "20px",
                            m: "10px auto 0",
                            background: "$gray100"
                        }} />
                    </Box>
                </Col>
            )
        }

        return tmp;
    }

    return (
        <>
            <HeaderLayoutSkeleton />

            <CustomContainer>
                {colValueNb && <>
                    <Row>
                        {renderColValue()}
                    </Row>
                </>}
                <Spacer y={3}/>
                <GridArraySkeleton />
            </CustomContainer>
        </>
    )
}
