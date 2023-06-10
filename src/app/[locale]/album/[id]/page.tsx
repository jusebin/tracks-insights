'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import React, {lazy, Suspense, useMemo} from "react";
import {Row, Spacer} from "@nextui-org/react";
import {useFormatter, useTranslations} from "use-intl";


// Helpers
import {getTracksDuration} from "@/app/helpers/get-tracks-duration";

// Components
import ClassicLayout from "@/app/layouts/classic-layout";
const TableTracks = lazy(() => import("@/app/components/table-tracks"));
const GridArray = lazy(() => import("@/app/components/grid-array"));
const ColValueTitle = lazy(() => import("@/app/components/col-value-title"));
const TitleSection = lazy(() => import("@/app/components/title-section"));

// Custom hooks
import useArtists from "@/app/hooks/use-artists";
import useAlbumTracks from "@/app/hooks/use-album-tracks";
import useAlbum from "@/app/hooks/use-album";
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
