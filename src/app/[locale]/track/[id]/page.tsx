'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import React, {lazy} from "react";
import {Row, Spacer} from "@nextui-org/react";
import {useFormatter, useTranslations} from "use-intl";
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;

// Helpers
import {convertMsToMinutes} from "@/app/helpers/convert-ms-to-minutes";
import {getItemsIds} from "@/app/helpers/get-artists-ids";

// Components
import {AudioScore} from "@/app/features/audio-score";
const ClassicLayout = lazy(() => import( "@/app/layouts/classic-layout"));
const GridArray = lazy(() => import( "@/app/components/grid-array"));
const ColValueTitle = lazy(() => import( "@/app/components/col-value-title"));

// Custom hooks
import useTrack from "@/app/hooks/use-track";
import useArtists from "@/app/hooks/use-artists";
import useQuery from "@/app/hooks/use-query";

export default function Track({params: {id}}: {
    params: Params
}) {
    const t = useTranslations('Song');
    const format = useFormatter();

    const {track} = useTrack(id);
    const {artists} = useArtists(track ? getItemsIds(track.artists).join(',') : '');

    const q = track ? `isrc:${track?.external_ids.isrc} artist:${track?.artists[0].name} track:${track.name}` : undefined;
    const {query} = useQuery('track', q);

    const getAlbumsFromQuery = () => {
        const albums: AlbumObjectSimplified[] = [];

        if (query && query.tracks && track) {
            query.tracks.items.forEach((item) => {
               if (item.name === track.name && item.artists[0].name === track.artists[0].name) {
                   albums.push(item.album);
               }
            });
        }

        return albums;
    }

    if (!track) {
        return null;
    }

    return (
        <ClassicLayout
            type={'track'}
            name={track.name}
            url={track.external_urls.spotify}
            imgSrc={track.album.images[0].url}
        >
            <>
                <Row>
                    <ColValueTitle value={convertMsToMinutes(track.duration_ms)} label={t('duration')} />
                    <ColValueTitle value={`${track.popularity} / 100`} label={t('popularity')} />
                    <ColValueTitle
                        value={
                            format.dateTime(new Date(track.album.release_date), {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })
                        }
                        label={t('releaseDate')}
                    />
                </Row>
                <Spacer y={3}/>

                <GridArray
                    title={"Artists"}
                    items={artists}
                    limit={6}
                />

                <GridArray
                    title={t('appearsOn')}
                    items={getAlbumsFromQuery()}
                    limit={6}
                />
                <Spacer y={2}/>

                <AudioScore id={track.id}/>
            </>
        </ClassicLayout>
    );
}
