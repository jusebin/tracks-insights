'use client';

import React, {Suspense, useCallback, useMemo, useState} from "react";
import {Spacer} from "@nextui-org/react";
import {Playback} from "../playback";
import {RecentlyPlayed} from "../recently-played";
import {useSession} from "next-auth/react";
import useSWR from "swr";
import {fetchPlaybackState} from "@/app/libs/fetch-playback-state";
import HeaderLayout from "@/app/features/header-layout";
import {fetchProfile} from "@/app/libs/fetchProfile";
import CustomContainer from "@/app/components/custom-container";
import {fetchRecentlyPlayed} from "@/app/libs/fetch-recently-played";
import TopTracksArtistsGenre from "@/app/features/top-tracks-artists-genre";
import GridArraySkeleton from "@/app/components/grid-array/skeleton";
import TopTracksArtistsGenreSkeleton from "@/app/features/top-tracks-artists-genre/skeleton";

export default function UserData() {
    const spacerOffset = 2;

    // Custom hooks
    const {data: session} = useSession();

    const {data: profile} = useSWR(session ? ['get-profile', {
        access_token: session.access_token
    }] : null, fetchProfile, {suspense: true});

    const {data: playbackState} = useSWR(session ? ['/api/spotify/get-playback', {
        access_token: session.access_token
    }] : null, fetchPlaybackState, {suspense: true});

    const {data: recentlyPlayed} = useSWR(session ? ['recently-played', {
        access_token: session.access_token
    }] : null, fetchRecentlyPlayed, {suspense: true});

    const renderPlayback = () => {
        if (
            playbackState?.is_playing &&
            playbackState.currently_playing_type === 'track' &&
            playbackState.item
        ) {
            return (
                <>
                    <Playback id={playbackState.item.id}/>
                    <Spacer y={spacerOffset}/>
                </>
            )
        }

        return null;
    }

    const name = useMemo(() => {
        if (profile) {
            return profile.display_name ? profile.display_name : profile.id
        }

        return ' ';
    }, [profile]);

    return (
        <>
            <HeaderLayout
                type={'user'}
                name={name}
                imgSrc={profile?.images ? profile.images[0].url : undefined}
                url={profile?.external_urls?.spotify || ''}
            />

            <CustomContainer>
                {renderPlayback()}

                <Suspense fallback={<TopTracksArtistsGenreSkeleton />}>
                    <TopTracksArtistsGenre />
                </Suspense>

                <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
                <Spacer y={spacerOffset}/>
            </CustomContainer>
        </>
    )
}
