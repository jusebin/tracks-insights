'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import ClassicLayout from "@/app/layouts/classic-layout";
import {Row, Spacer} from "@nextui-org/react";
import {ColValueTitle} from "@/app/components/col-value-title";
import {useTranslations} from "use-intl";
import {useArtist} from "@/app/hooks/useArtist";
import {useArtistAlbums} from "@/app/hooks/useArtistAlbums";
import {useArtistTopTracks} from "@/app/hooks/useArtistTopTracks";
import {useRelatedArtists} from "@/app/hooks/useRelatedArtists";
import {ArtistPopularTracks} from "@/app/features/artist-popular-tracks";
import {GridArray} from "@/app/components/grid-array";

export default function Album({params: {id}}: {
    params: Params
}) {
    // const artistTranslations = useTranslations('Artist');
    //
    // const {artist} = useArtist(id);
    // const {artistTopTracks} = useArtistTopTracks(id);
    // const {albums} = useArtistAlbums(id);
    // const {relatedArtists} = useRelatedArtists(id);
    //
    // if (!artist) {
    //     return null;
    // }

    return (
        <div>coucou</div>
        // <ClassicLayout
        //     type={artist.type}
        //     name={artist.name}
        //     imgSrc={artist.images[0].url}
        //     url={artist.external_urls.spotify}
        // >
        //     <Row>
        //         <ColValueTitle value={(albums.filter(album => album.album_type === 'album')).length} label={artistTranslations('albums')} />
        //         <ColValueTitle value={`${artist.popularity} / 100`} label={artistTranslations('popularity')} />
        //         <ColValueTitle value={new Intl.NumberFormat().format(artist.followers.total)} label={artistTranslations('followers')} />
        //     </Row>
        //     <Spacer y={2} />
        //
        //     <ArtistPopularTracks tracks={artistTopTracks} />
        //     <Spacer y={2} />
        //
        //     <GridArray
        //         title={artistTranslations('discography')}
        //         items={albums.filter(album => ["album", "single"].includes(album.album_group || ""))}
        //         limit={6}
        //     />
        //     <Spacer y={2} />
        //
        //     <GridArray
        //         title={artistTranslations('fansAlsoLike')}
        //         items={relatedArtists}
        //         limit={6}
        //     />
        //     <Spacer y={2} />
        //
        //     <GridArray
        //         title={artistTranslations('appearsOn')}
        //         items={albums.filter(album => ["appears_on"].includes(album.album_group || ""))}
        //         limit={6}
        //     />
        //     <Spacer y={3} />
        // </ClassicLayout>
    );
}
