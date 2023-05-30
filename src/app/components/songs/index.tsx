import {CardsContainer} from "@/app/components/cards-container";
import React, {useCallback} from "react";
import {CustomCard} from "@/app/components/custom-card";
import {Grid} from "@nextui-org/react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {getArtistsNames} from "@/app/helpers/getArtistsNames";
import {TimeRange} from "@/app/constants/timeRanges";
import {useTranslations} from "use-intl";

export function Songs({songs, limit, timeRange}: {songs: TrackObjectFull[], limit: number, timeRange: TimeRange}) {
    const handleTimeRangeT = useTranslations('HandleTimeRange');
    const titleT = useTranslations('TitlesH2');

    const renderSongs = useCallback(() => {
        if (songs.length) {
            return songs.map((song: TrackObjectFull, index: number) => {
                return (
                    <Grid xs={12} sm={6} md={4} lg={3} key={`song-${index}`}>
                        <CustomCard
                            imageSrc={song.album.images[0].url}
                            title={song.name}
                            subtitle={getArtistsNames(song.artists)}
                            position={index + 1}
                            addSpacer={index < songs.length - 1}
                        />
                    </Grid>
                )
            });
        }

        return null;
    }, [songs]);

    return (
        <CardsContainer
            title={titleT("topTracks", {number: limit})}
            subtitle={handleTimeRangeT(timeRange.labelKey)}
        >{renderSongs()}</CardsContainer>
    )
}
