'use client';

import HeaderLayoutSkeleton from "@/app/features/header-layout/skeleton";
import GridArraySkeleton from "@/app/components/grid-array/skeleton";
import CustomContainer from "@/app/components/custom-container";
import {Spacer} from "@nextui-org/react";
import React from "react";
import ColValueTitleSkeleton from "@/app/components/col-value-title/skeleton";

export default function Loading({colValueNb}: {
    colValueNb?: number
}) {return (
        <>
            <HeaderLayoutSkeleton />

            <CustomContainer>
                <ColValueTitleSkeleton colValueNb={colValueNb || 4} />
                <Spacer y={3}/>
                <GridArraySkeleton />
            </CustomContainer>
        </>
    )
}
