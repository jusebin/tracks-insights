import {useSongs} from "@/app/hooks/useSongs";
import {CardsContainer} from "@/app/components/cards-container";
import React, {useCallback} from "react";
import {CustomCard} from "@/app/components/custom-card";
import {Grid} from "@nextui-org/react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;

export function Songs({limit}: {limit: number}) {
    const {songs} = useSongs(limit);
    const title = `Top ${limit} tracks`;

    const getArtistsNames = (artists: ArtistObjectSimplified[]): string => {
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
            title={title}
            subtitle={"from the last 30 days"}
        >{renderSongs()}</CardsContainer>
    )
}
