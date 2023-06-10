'use client';

import {useSession} from "next-auth/react";
import useSWR from "swr";
import {fetchArtist} from "@/app/libs/fetchArtist";
import {useTranslations} from "use-intl";
import {Row, Spacer} from "@nextui-org/react";
import React, {useMemo} from "react";
import GridArray from "@/app/components/grid-array";
import ArtistPopularTracks from "@/app/features/artist-popular-tracks";
import ColValueTitle from "@/app/components/col-value-title";
import {fetchProfile} from "@/app/libs/fetchProfile";
import {fetchArtistAlbums} from "@/app/libs/fetchArtistAlbums";
import {fetchRelatedArtists} from "@/app/libs/fetch-related-artists";
import {fetchArtistTopTracks} from "@/app/libs/fetchArtistTopTracks";
import CustomContainer from "@/app/components/custom-container";
import HeaderLayout from "@/app/features/header-layout";

export default function ArtistData({id}: {
    id: string
}) {
    const artistTranslations = useTranslations('Artist');
    const {data: session} = useSession();
    const {data: artist} = useSWR(session ? ['/api/spotify/get-artist', {
        id,
        access_token: session.access_token
    }] : null, fetchArtist, {suspense: true});

    const {data: profile} = useSWR(session ? {
        access_token: session.access_token
    } : null, fetchProfile, {suspense: true});

    const {data: artistAlbums} = useSWR(session ? ['/api/spotify/get-artist-albums', {
        id,
        access_token: session.access_token
    }] : null, fetchArtistAlbums, {suspense: true});

    const {data: artistTopTracks} = useSWR(session && profile ? ['/api/spotify/get-artist-top-tracks', {
        id,
        country: profile.country,
        access_token: session.access_token
    }] : null, fetchArtistTopTracks, {suspense: true})

    const {data: relatedArtists} = useSWR(profile && session ? ['/api/spotify/get-related-artists', {
        id,
        country: profile.country,
        access_token: session.access_token
    }] : null, fetchRelatedArtists, {suspense: true});

    const realAlbums = useMemo(() => {
        if (!artistAlbums) {
            return [];
        }

        return artistAlbums.filter(album => album.type === 'album');
    }, [artistAlbums]);

    const discography = useMemo(() => {
        if (!artistAlbums) {
            return [];
        }

        return artistAlbums.filter(album => ["album", "single"].includes(album.album_group || ''));
    }, [artistAlbums]);

    const albumAppears = useMemo(() => {
        if (!artistAlbums) {
            return [];
        }

        return artistAlbums.filter((album) => ["appears_on"].includes(album.album_group || ""));
    }, [artistAlbums]);

    return (
        <>
            <HeaderLayout
                type={'artist'}
                name={artist?.name || ''}
                url={artist?.external_urls.spotify || ''}
                imgSrc={artist?.images[1].url}
            />

            <CustomContainer>
                <Row>
                    <ColValueTitle
                        value={realAlbums.length}
                        label={artistTranslations('albums')}
                    />
                    <ColValueTitle value={`${artist?.popularity} / 100`} label={artistTranslations('popularity')} />
                    <ColValueTitle value={new Intl.NumberFormat().format(artist?.followers.total || 0)} label={artistTranslations('followers')} />
                </Row>
                <Spacer y={2} />

                <ArtistPopularTracks tracks={artistTopTracks || []} />
                <Spacer y={2} />

                <GridArray
                    title={artistTranslations('discography')}
                    items={discography}
                    limit={6}
                />
                <Spacer y={2} />

                <GridArray
                    title={artistTranslations('fansAlsoLike')}
                    items={relatedArtists || []}
                    limit={6}
                />
                <Spacer y={2} />

                <GridArray
                    title={artistTranslations('appearsOn')}
                    items={albumAppears}
                    limit={6}
                />
                <Spacer y={3} />
            </CustomContainer>
        </>
    )
}
