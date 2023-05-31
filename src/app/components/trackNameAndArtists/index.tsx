import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {Text} from "@nextui-org/react";
import {getArtistsNames} from "@/app/helpers/getArtistsNames";
import React from "react";

export function TrackNameAndArtists({track, isBold, lineClampTrack, lineClampArtist}: {
    track: TrackObjectFull,
    isBold?: boolean,
    lineClampTrack?: number
    lineClampArtist?: number
}) {
    const clampTrackStyle = lineClampTrack ? {
        display: "-webkit-box",
        WebkitLineClamp: lineClampTrack,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
    } : undefined;

    const clampArtistStyle = lineClampArtist ? {
        display: "-webkit-box",
        WebkitLineClamp: lineClampArtist,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
    } : undefined;

    return (
        <>
            <Text size={"$lg"} weight={isBold ? 'bold' : 'normal'} css={clampTrackStyle}>{track.name}</Text>
            <Text color={"$gray700"} css={clampArtistStyle}>{getArtistsNames(track.artists)}</Text>
        </>
    )
}
