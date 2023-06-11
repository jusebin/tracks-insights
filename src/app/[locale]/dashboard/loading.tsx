'use client';

import HeaderLayoutSkeleton from "@/app/features/header-layout/skeleton";
import GridArraySkeleton from "@/app/components/grid-array/skeleton";
import CustomContainer from "@/app/components/custom-container";
import {Col, Row, Spacer} from "@nextui-org/react";
import React, {ReactElement} from "react";
import {Box} from "@/app/components/box";

export default function Loading({colValueNb, fakeImgRounded}: {
    colValueNb?: number,
    fakeImgRounded?: boolean
}) {
    return (
        <>
            <HeaderLayoutSkeleton fakeImgRounded={fakeImgRounded} />
            <CustomContainer>
                <Spacer y={3}/>
                <GridArraySkeleton />
            </CustomContainer>
        </>
    )
}
