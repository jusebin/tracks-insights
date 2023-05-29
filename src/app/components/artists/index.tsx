import {useArtists} from "@/app/hooks/useArtists";
import {CardsContainer} from "@/app/components/cards-container";
import React, {useCallback} from "react";
import {CustomCard} from "@/app/components/custom-card";
import {Grid} from "@nextui-org/react";

export function Artists({limit}: { limit: number }) {
    const {artists} = useArtists(limit);
    const title = `Top ${limit} artists`;

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
        <CardsContainer
            title={title}
            subtitle={"from the last 30 days"}
        >{renderArtists()}</CardsContainer>
    );
}
