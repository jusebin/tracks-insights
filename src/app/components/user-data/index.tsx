'use client';
import React, {useCallback, useState} from "react";
import {Container, Spacer} from "@nextui-org/react";
import {Artists} from "@/app/components/artists";
import {Songs} from "@/app/components/songs";
import Profile from "@/app/components/profile";
import {usePlaybackState} from "@/app/hooks/usePlaybackState";
import {Playback} from "@/app/components/playback";
import {Genres} from "@/app/components/genres";
import {useSongs} from "@/app/hooks/useSongs";
import {useArtists} from "@/app/hooks/useArtists";
import {timeRanges} from "@/app/constants/timeRanges";
import {HandleTimeRange} from "@/app/components/handle-time-range";
import {useAudioFeatures} from "@/app/hooks/useAudioFeatures";
import {AudioScore} from "@/app/components/audio-score";

export function UserData() {
    const limitTopItems = 5;
    const sizeBetWeenSections = 2;

    // Main state
    const [usedTimeRange, setUsedTimeRange] = useState(timeRanges.find(t => t.value === 'medium_term'));

    // Custom hooks
    const {playbackState} = usePlaybackState();
    const {songs, setSongsLoading} = useSongs(limitTopItems, usedTimeRange.value);
    const {artists, setArtistsLoading} = useArtists(limitTopItems, usedTimeRange.value);
    const {audioFeatures} = useAudioFeatures(songs);

    const handleTimeRangeCta = useCallback((timeRange) => {
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
                    <Playback playbackState={playbackState}/>
                    <Spacer y={sizeBetWeenSections}/>
                </>
            )
        }

        return null;
    }

    return (<Container fluid>
        <Profile/>
        <Spacer y={sizeBetWeenSections} />

        {renderPlayback()}

        <HandleTimeRange usedTimeRange={usedTimeRange} handleCta={handleTimeRangeCta} />

        <AudioScore audioFeatures={audioFeatures} />
        <Spacer y={sizeBetWeenSections}/>

        <Songs songs={songs} limit={limitTopItems} timeRange={usedTimeRange}/>
        <Spacer y={sizeBetWeenSections}/>

        <Artists artists={artists} limit={limitTopItems} timeRange={usedTimeRange}/>
        <Spacer y={sizeBetWeenSections}/>

        <Genres artists={artists} timeRange={usedTimeRange}/>
    </Container>)
}
