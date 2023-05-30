import {CardsContainer} from "@/app/components/cards-container";
import React, {useCallback} from "react";
import {CustomCard} from "@/app/components/custom-card";
import {Grid} from "@nextui-org/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import {TimeRange} from "@/app/constants/timeRanges";
import {useTranslations} from "use-intl";

export function Artists({artists, limit, timeRange}: {
    artists: ArtistObjectFull[],
    limit: number,
    timeRange: TimeRange
}) {
    const handleTimeRangeT = useTranslations('HandleTimeRange');
    const titleT = useTranslations('TitlesH2');

    const renderArtists = useCallback(() => {
        if (artists.length) {
            return artists.map((artist, index) => {
                return (
                    <Grid xs={12} sm={6} md={4} lg={3} key={`artist-${index}`}>
                        <CustomCard
                            imageSrc={artist.images[0].url}
                            title={artist.name}
                            position={index + 1}
                            addSpacer={index < artists.length - 1}
                        />
                    </Grid>
                )
            });
        }

        return null;
    }, [artists]);

    return (
        <section>
            <CardsContainer
                title={titleT("topArtists", {number: limit})}
                subtitle={handleTimeRangeT(timeRange.labelKey)}
            >{renderArtists()}</CardsContainer>
        </section>
    );
}
