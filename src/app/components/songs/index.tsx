import {useSongs} from "@/app/hooks/useSongs";
import {CardsContainer} from "@/app/components/cards-container";
import {useCallback} from "react";
import {CustomCard} from "@/app/components/custom-card";

export function Songs({limit}: {limit: number}) {
    const {songs} = useSongs(limit);
    const title = `Top ${limit} tracks`;

    const getArtistsNames = (artists) => {
        let names = '';

        for (let i = 0; i < artists.length; i++) {
            names+= artists[i].name;

            if (i < artists.length - 1) (
                names+= ', '
            )
        }

        return names;
    }

    const renderSongs = useCallback(() => {
        if (songs.length) {
            return songs.map((song, index) => {
                return <CustomCard
                    cardType={'song'}
                    imageSrc={song.album.images[1].url}
                    imageWidth={song.album.images[1].width}
                    imageHeight={song.album.images[1].height}
                    title={song.name}
                    subtitle={getArtistsNames(song.artists)}
                    position={index + 1}
                    addSpacer={index < songs.length - 1}
                />
            });
        }

        return null;
    }, [songs]);

    return (
        <CardsContainer title={title} subtitle={"from the last 30 days"}>
            {renderSongs()}
        </CardsContainer>
    )
}
