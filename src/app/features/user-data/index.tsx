'use client';

import React, {useCallback, useMemo, useState} from "react";
import {Spacer} from "@nextui-org/react";
import {Playback} from "../playback";
import {Genres} from "@/app/components/genres";

import {TimeRange, timeRanges} from "@/app/constants/time-ranges";
import {HandleTimeRange} from "@/app/components/handle-time-range";
import {RecentlyPlayed} from "../recently-played";
import GridArray from "../../components/grid-array";
import {useTranslations} from "use-intl";
import {useSession} from "next-auth/react";
import useSWR from "swr";
import {fetchPlaybackState} from "@/app/libs/fetch-playback-state";
import {fetchTopItems} from "@/app/libs/fetch-top-items";
import HeaderLayout from "@/app/features/header-layout";
import {fetchProfile} from "@/app/libs/fetchProfile";
import CustomContainer from "@/app/components/custom-container";
import {fetchRecentlyPlayed} from "@/app/libs/fetch-recently-played";

export default function UserData() {
    const dashboardTranslations = useTranslations("Dashboard");
    const spacerOffset = 2;

    // Main state
    const [usedTimeRange, setUsedTimeRange] = useState<TimeRange>(timeRanges[1]);

    // Custom hooks
    const {data: session} = useSession();

    const {data: profile} = useSWR(session ? ['get-profile', {
        access_token: session.access_token
    }] : null, fetchProfile, {suspense: true});

    const {data: playbackState} = useSWR(session ? ['/api/spotify/get-playback', {
        access_token: session.access_token
    }] : null, fetchPlaybackState, {suspense: true});

    const {data: topTracks} = useSWR(session ? ['/api/spotify/get-top-tracks', {
        timeRange: usedTimeRange.value,
        type: "tracks",
        access_token: session.access_token
    }] : null, fetchTopItems, {suspense: true});

    const {data: topArtists} = useSWR(session ? ['/api/spotify/get-top-artists', {
        timeRange: usedTimeRange.value,
        type: "artists",
        access_token: session.access_token
    }] : null, fetchTopItems, {suspense: true});

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

                <GridArray
                    title={dashboardTranslations('titles.topTracks')}
                    items={topTracks}
                    limit={6}
                    ranking
                />
                <Spacer y={spacerOffset}/>

                <GridArray
                    title={dashboardTranslations('titles.topArtists')}
                    items={topArtists || []}
                    limit={6}
                    ranking
                />

                <Spacer y={spacerOffset}/>

                <Genres artists={topArtists || []} timeRange={usedTimeRange}/>
                <Spacer y={spacerOffset}/>

                <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
                <Spacer y={spacerOffset}/>
                <HandleTimeRange usedTimeRange={usedTimeRange} handleCta={setUsedTimeRange}/>
            </CustomContainer>
        </>
    )
}
