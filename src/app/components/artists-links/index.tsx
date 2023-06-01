import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import React, {useCallback} from "react";
import {Link} from "@nextui-org/react";

export default function ArtistsLinks({artists}: {
    artists: ArtistObjectSimplified[] | ArtistObjectFull[]
}) {
    const renderArtists = useCallback(() => {
        return artists.map((artist, index) => {
           return <React.Fragment key={`artist-header-page-${index}`}>
               <Link color={"text"} href={`../artist/${artist.id}`}>{artist.name}</Link>
               {index < artists.length - 1 && ", "}
           </React.Fragment>
        });
    }, [artists])

    return (
        <>
            {renderArtists()}
        </>
    )
}
