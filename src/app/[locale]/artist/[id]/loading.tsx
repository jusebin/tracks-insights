'use client';

import HeaderLayoutSkeleton from "@/app/features/header-layout/skeleton";
import CustomContainer from "@/app/components/custom-container";
import {Spacer} from "@nextui-org/react";
import React from "react";
import ArtistPopularTracksSkeleton from "@/app/features/artist-popular-tracks/skeleton";
import ColValueTitleSkeleton from "@/app/components/col-value-title/skeleton";

export default function Loading({colValueNb}: {
    colValueNb?: number
}) {
    return (
        <>
            <HeaderLayoutSkeleton fakeImgRounded={true} />

            <CustomContainer>
                <ColValueTitleSkeleton colValueNb={colValueNb || 3} />
                <Spacer y={3}/>

                <ArtistPopularTracksSkeleton />
            </CustomContainer>
        </>
    )
}
