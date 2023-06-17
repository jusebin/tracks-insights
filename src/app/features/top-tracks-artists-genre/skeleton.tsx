import CustomContainer from "@/app/components/custom-container";
import {Spacer} from "@nextui-org/react";
import GridArraySkeleton from "@/app/components/grid-array/skeleton";
import React from "react";

export default function TopTracksArtistsGenreSkeleton() {
    return <CustomContainer>
        <Spacer y={3}/>
        <GridArraySkeleton />
        <Spacer y={3}/>
        <GridArraySkeleton />
        <Spacer y={3}/>
        <GridArraySkeleton />
    </CustomContainer>
}
