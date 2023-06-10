'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import React, {Suspense} from "react";

import TrackData from "@/app/features/track-data";
import Header from "@/app/components/header/header";
import Loading from "@/app/[locale]/track/[id]/loading";

export default function Track({params: {id}}: {
    params: Params
}) {
    return (
        <>
            <Header />
            <Suspense fallback={<Loading colValueNb={3} />}>
                <TrackData id={id} />
            </Suspense>
        </>
    );
}
