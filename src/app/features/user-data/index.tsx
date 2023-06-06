'use client';

import React, {useCallback, useState} from "react";
import {Spacer} from "@nextui-org/react";
import {usePlaybackState} from "@/app/hooks/usePlaybackState";
import {Playback} from "@/app/components/playback";
import {Genres} from "@/app/components/genres";
import {useSongs} from "@/app/hooks/useSongs";
import {useArtists} from "@/app/hooks/useArtists";
import {TimeRange, timeRanges} from "@/app/constants/timeRanges";
import {HandleTimeRange} from "@/app/components/handle-time-range";
import {RecentlyPlayed} from "../recently-played";
import {GridArray} from "../../components/grid-array";
import {useTranslations} from "use-intl";
import CurrentPlaybackResponse = SpotifyApi.CurrentPlaybackResponse;
import CurrentlyPlayingObject = SpotifyApi.CurrentlyPlayingObject;

export function UserData() {
    const dashboardTranslations = useTranslations("Dashboard");
    const limitTopItems = 50;
    const spacerOffset = 2;

    // Main state
    const [usedTimeRange, setUsedTimeRange] = useState<TimeRange>(timeRanges[1]);

    // Custom hooks
    const {playbackState} = usePlaybackState();
    const {songs, setSongsLoading} = useSongs(limitTopItems, usedTimeRange.value);
    const {artists, setArtistsLoading} = useArtists(limitTopItems, usedTimeRange.value);

    const handleTimeRangeCta = useCallback((timeRange: TimeRange) => {
        setUsedTimeRange(timeRange);
        setSongsLoading(true);
        setArtistsLoading(true);
    }, [setSongsLoading, setArtistsLoading]);

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
                items={songs}
                limit={6}
                ranking
            />
            <Spacer y={spacerOffset}/>

            <GridArray
                title={dashboardTranslations('titles.topArtists')}
                items={artists}
                limit={6}
                ranking
            />

            <Spacer y={spacerOffset}/>

            <Genres artists={artists} timeRange={usedTimeRange}/>
            <Spacer y={spacerOffset}/>

            <RecentlyPlayed/>
            <Spacer y={spacerOffset}/>
            <HandleTimeRange usedTimeRange={usedTimeRange} handleCta={handleTimeRangeCta}/>
        </>
    )
}
