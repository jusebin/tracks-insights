'use client';

import React, {Suspense} from "react";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";

// Components
import Header from "@/app/components/header/header";
import ArtistData from "@/app/features/artist-data";
import Loading from "@/app/[locale]/artist/[id]/loading";
import HeaderLayout from "@/app/features/header-layout";

export default function Album({params: {id}}: {
    params: Params
}) {
    return (
        <>
            <Header />
            <Suspense fallback={<Loading colValueNb={3} />}>
                <ArtistData id={id} />
            </Suspense>
        </>
    );
}
