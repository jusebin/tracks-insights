import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {Link, Text} from "@nextui-org/react";
import {getArtistsNames} from "@/app/helpers/get-artists-names";
import React from "react";
import {getLineClampStyle} from "@/app/helpers/get-line-clamp-style";

export function TrackNameAndArtists({track, isBold, lineClampTrack, lineClampArtist, withLink}: {
    track: TrackObjectFull,
    isBold?: boolean,
    lineClampTrack?: number,
    lineClampArtist?: number,
    withLink?: boolean

}) {
    const clampTrackStyle = lineClampTrack ? getLineClampStyle(lineClampTrack) : undefined;
    const clampArtistStyle = lineClampArtist ? getLineClampStyle(lineClampArtist) : undefined;

    return (
        <>
            {withLink ?
                <Link href={`../track/${track.id}`} css={{d: "block"}}><Text size={"$lg"} weight={isBold ? 'bold' : 'normal'} css={clampTrackStyle}>{track.name}</Text></Link> :
                <Text size={"$lg"} weight={isBold ? 'bold' : 'normal'} css={clampTrackStyle}>{track.name}</Text>
            }

            {withLink ?
                <Link href={`../artist/${track.id}`} css={{d: "block"}}><Text color={"$gray700"} css={clampArtistStyle}>{getArtistsNames(track.artists)}</Text></Link> :
                <Text color={"$gray700"} css={clampArtistStyle}>{getArtistsNames(track.artists)}</Text>
            }

        </>
    )
}
