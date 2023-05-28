import {useArtists} from "@/app/hooks/useArtists";
import {CardsContainer} from "@/app/components/cards-container";
import {useCallback} from "react";
import {CustomCard} from "@/app/components/custom-card";

export function Artists({limit}: {limit: number}) {
    const {artists} = useArtists(limit);
    const title = `Top ${limit} artists`;

    const renderArtists = useCallback(() => {
        if (artists.length) {
            return artists.map((artist, index) => {
                return <CustomCard
                    cardType={'artist'}
                    imageSrc={artist.images[1].url}
                    imageWidth={artist.images[1].width}
                    imageHeight={artist.images[1].height}
                    title={artist.name}
                    position={index + 1}
                    addSpacer={index < artists.length - 1}
                />
            });
        }

        return null;
    }, [artists]);

    return (
        <CardsContainer title={title} subtitle={"from the last 30 days"}>
            {renderArtists()}
        </CardsContainer>
    );
}
