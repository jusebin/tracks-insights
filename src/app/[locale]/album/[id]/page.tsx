'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import React, {lazy, useMemo} from "react";
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

export default function Album({params: {id}}: {
    params: Params
}) {
    const commonTranslations = useTranslations("Common");
    const titlesTranslations = useTranslations("TitlesH2");
    const albumTranslations = useTranslations('Album');
    const format = useFormatter();

    const {album} = useAlbum(id);
    const {albumTracks, offset} = useAlbumTracks(id, album ? album.total_tracks : 0);

    const artistsIds: string[] = useMemo(() => {
        if (!album) {
            return []
        }

        return album.artists.map((artist) => artist.id);

    }, [album]);

    const {artists} = useArtists(artistsIds.join(','));

    if (!album) {
        return null;
    }

    return (
        <ClassicLayout
            type={"album"}
            name={album.name}
            imgSrc={album.images[0].url}
            url={album.external_urls.spotify}
        >
            <Row>
                <ColValueTitle value={`${album.popularity} / 100`} label={albumTranslations('popularity')}/>
                <ColValueTitle value={format.dateTime(new Date(album.release_date), {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })} label={albumTranslations('releaseDate')}/>
                <ColValueTitle value={albumTracks.length} label={albumTranslations('tracks')}/>
                <ColValueTitle value={getTracksDuration(albumTracks)} label={albumTranslations('duration')}/>
            </Row>
            <Spacer y={2}/>

            <GridArray
                title={commonTranslations('titles.artists')}
                items={artists}
                limit={6}
            />
            <Spacer y={2}/>

            <TitleSection title={titlesTranslations("albumContent")}/>
            {albumTracks.length && <TableTracks tracks={albumTracks}/>}
        </ClassicLayout>
    );
}
