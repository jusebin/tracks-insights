'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import React, {Suspense} from "react";

// Components
import Header from "@/app/components/header/header";
import AlbumData from "@/app/features/album-data";
import Loading from "@/app/[locale]/album/[id]/loading";

export default function Album({params: {id}}: {
    params: Params
}) {
    return (
        <>
            <Header />
            <Suspense fallback={<Loading colValueNb={4} />}>
                <AlbumData id={id} />
            </Suspense>
        </>
    );
}
