'use client';

import HeaderLayoutSkeleton from "@/app/features/header-layout/skeleton";
import GridArraySkeleton from "@/app/components/grid-array/skeleton";
import CustomContainer from "@/app/components/custom-container";
import {Spacer} from "@nextui-org/react";
import React from "react";

export default function Loading({fakeImgRounded}: {
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
