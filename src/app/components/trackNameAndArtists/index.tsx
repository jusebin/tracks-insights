import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {Text} from "@nextui-org/react";
import {getArtistsNames} from "@/app/helpers/getArtistsNames";
import React from "react";

export function TrackNameAndArtists({track, isBold}: {
    track: TrackObjectFull
    isBold?: boolean
}) {
    return (
        <>
            <Text size={"$lg"} weight={isBold ? 'bold' : 'normal'}>{track.name}</Text>
            <Text css={{color: '$gray700'}}>{getArtistsNames(track.artists)}</Text>
        </>
    )
}
