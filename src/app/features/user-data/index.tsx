'use client';

import React, {useCallback, useState} from "react";
import {Spacer} from "@nextui-org/react";
import {usePlaybackState} from "@/app/hooks/use-playback-state";
import {Playback} from "../playback";
import {Genres} from "@/app/components/genres";

import {TimeRange, timeRanges} from "@/app/constants/time-ranges";
import {HandleTimeRange} from "@/app/components/handle-time-range";
import {RecentlyPlayed} from "../recently-played";
import {GridArray} from "../../components/grid-array";
import {useTranslations} from "use-intl";
import {useTopTracks} from "@/app/hooks/use-top-tracks";
import {useTopArtists} from "@/app/hooks/use-top-artists";

export function UserData() {
    const dashboardTranslations = useTranslations("Dashboard");
    const limitTopItems = 50;
    const spacerOffset = 2;

    // Main state
    const [usedTimeRange, setUsedTimeRange] = useState<TimeRange>(timeRanges[1]);

    // Custom hooks
    const {playbackState} = usePlaybackState();
    const {topTracks, setTopTracksLoading} = useTopTracks(limitTopItems, usedTimeRange.value);
    const {topArtists, setTopArtistsLoading} = useTopArtists(limitTopItems, usedTimeRange.value);

    const handleTimeRangeCta = useCallback((timeRange: TimeRange) => {
        setUsedTimeRange(timeRange);
        setTopTracksLoading(true);
        setTopArtistsLoading(true);
    }, [setTopTracksLoading, setTopArtistsLoading]);

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

    return (
        <>
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
                items={topArtists}
                limit={6}
                ranking
            />

            <Spacer y={spacerOffset}/>

            <Genres artists={topArtists} timeRange={usedTimeRange}/>
            <Spacer y={spacerOffset}/>

            <RecentlyPlayed/>
            <Spacer y={spacerOffset}/>
            <HandleTimeRange usedTimeRange={usedTimeRange} handleCta={handleTimeRangeCta}/>
        </>
    )
}
