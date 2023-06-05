import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {Text} from "@nextui-org/react";
import {getArtistsNames} from "@/app/helpers/getArtistsNames";
import React from "react";
import {getLineClampStyle} from "@/app/helpers/getLineClampStyle";

export function TrackNameAndArtists({track, isBold, lineClampTrack, lineClampArtist}: {
    track: TrackObjectFull,
    isBold?: boolean,
    lineClampTrack?: number
    lineClampArtist?: number
}) {
    const clampTrackStyle = lineClampTrack ? getLineClampStyle(lineClampTrack) : undefined;
    const clampArtistStyle = lineClampArtist ? getLineClampStyle(lineClampArtist) : undefined;

    return (
        <>
            <Text size={"$lg"} weight={isBold ? 'bold' : 'normal'} css={clampTrackStyle}>{track.name}</Text>
            <Text color={"$gray700"} css={clampArtistStyle}>{getArtistsNames(track.artists)}</Text>
        </>
    )
}
