'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {useTrack} from "@/app/hooks/useTrack";
import React from "react";
import {Row, Spacer} from "@nextui-org/react";
import {convertMsToMinutes} from "@/app/helpers/convertMsToMinutes";
import {useFormatter, useTranslations} from "use-intl";
import {AudioScore} from "@/app/features/audio-score";
import ClassicLayout from "@/app/layouts/classic-layout";
import {ColValueTitle} from "@/app/components/col-value-title";
import {GridArray} from "@/app/components/grid-array";
import {useQuery} from "@/app/hooks/useQuery";
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;
import {getItemsIds} from "@/app/helpers/getArtistsIds";
import {useArtists} from "@/app/hooks/useArtists";

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
