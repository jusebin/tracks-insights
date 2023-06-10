'use client';

import React, {lazy} from "react";
import {useFormatter, useTranslations} from "use-intl";
import {Row, Spacer} from "@nextui-org/react";
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;

// Helpers
import {convertMsToMinutes} from "@/app/helpers/convert-ms-to-minutes";

import {getItemsIds} from "@/app/helpers/get-artists-ids";
// Components
const HeaderLayout = lazy(() => import("@/app/features/header-layout"));
const GridArray = lazy(() => import( "@/app/components/grid-array"));
const ColValueTitle = lazy(() => import( "@/app/components/col-value-title"));
const AudioScore = lazy(() => import ("@/app/features/audio-score"));
import CustomContainer from "@/app/components/custom-container";

// Custom hooks
import useSWR from "swr";
import {useSession} from "next-auth/react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {fetchTrack} from "@/app/libs/fetchTrack";
import {fetchArtists} from "@/app/libs/fetchArtists";
import {fetchQuery} from "@/app/libs/fetchQuery";

export default function TrackData({id}: {
    id: string
}) {
    const t = useTranslations('Song');
    const format = useFormatter();
    const {data: session} = useSession();

    const {data: track} = useSWR(session ? {
        id,
        access_token: session.access_token
    } : null, fetchTrack, {suspense: true});

    const {data: artists} = useSWR(session && track ? {
        ids: getItemsIds(track.artists).join(','),
        access_token: session.access_token
    } : null, fetchArtists, {suspense: true});

    const {data: query} = useSWR(session && track ? {
        q: `isrc:${track.external_ids.isrc} artist:${track.artists[0].name} track:${track.name}`,
        type: 'track',
        access_token: session.access_token
    } : null, fetchQuery, {suspense: true});

    const getAlbumsFromQuery = () => {
        const albums: AlbumObjectSimplified[] = [];

        if (query && query.tracks && track) {
            query.tracks.items.forEach((item: TrackObjectFull) => {
                if (item.name === track.name && item.artists[0].name === track.artists[0].name) {
                    albums.push(item.album);
                }
            });
        }

        return albums;
    }

    return (
        <>
            <HeaderLayout
                type={'track'}
                name={track?.name || ''}
                url={track?.external_urls.spotify || ''}
                imgSrc={track?.album.images[0].url}
            />

            <CustomContainer>
                <Row>
                    <ColValueTitle value={convertMsToMinutes(track?.duration_ms || 0)} label={t('duration')}/>
                    <ColValueTitle value={`${track?.popularity} / 100`} label={t('popularity')}/>
                    <ColValueTitle
                        value={
                            format.dateTime(new Date(track?.album.release_date || new Date()), {
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
                    items={artists || []}
                    limit={6}
                />

                <GridArray
                    title={t('appearsOn')}
                    items={getAlbumsFromQuery()}
                    limit={6}
                />
                <Spacer y={2}/>

                <AudioScore id={track?.id || ''}/>
            </CustomContainer>
        </>
    )
}
