'use client';

import React, {lazy} from "react";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {Row, Spacer} from "@nextui-org/react";

import {useTranslations} from "use-intl";

// Components
import ClassicLayout from "@/app/layouts/classic-layout";
const ColValueTitle = lazy(() => import("@/app/components/col-value-title"));
const ArtistPopularTracks = lazy(() => import("@/app/features/artist-popular-tracks"));
const GridArray = lazy(() => import("@/app/components/grid-array"));

// Custom hooks
import useArtist from "@/app/hooks/use-artist";
import useArtistAlbums from "@/app/hooks/use-artist-albums";
import useArtistTopTracks from "@/app/hooks/use-artist-top-tracks";
import useRelatedArtists from "@/app/hooks/use-related-artists";

export default function Album({params: {id}}: {
    params: Params
}) {
    const artistTranslations = useTranslations('Artist');

    const {artist} = useArtist(id);
    const {artistTopTracks} = useArtistTopTracks(id);
    const {albums} = useArtistAlbums(id);
    const {relatedArtists} = useRelatedArtists(id);

    if (!artist) {
        return null;
    }

    return (
        <ClassicLayout
            type={artist.type}
            name={artist.name}
            imgSrc={artist.images[0].url}
            url={artist.external_urls.spotify}
        >
            <Row>
                <ColValueTitle value={(albums.filter(album => album.album_type === 'album')).length} label={artistTranslations('albums')} />
                <ColValueTitle value={`${artist.popularity} / 100`} label={artistTranslations('popularity')} />
                <ColValueTitle value={new Intl.NumberFormat().format(artist.followers.total)} label={artistTranslations('followers')} />
            </Row>
            <Spacer y={2} />

            <ArtistPopularTracks tracks={artistTopTracks} />
            <Spacer y={2} />

            <GridArray
                title={artistTranslations('discography')}
                items={albums.filter(album => ["album", "single"].includes(album.album_group || ""))}
                limit={6}
            />
            <Spacer y={2} />

            <GridArray
                title={artistTranslations('fansAlsoLike')}
                items={relatedArtists}
                limit={6}
            />
            <Spacer y={2} />

            <GridArray
                title={artistTranslations('appearsOn')}
                items={albums.filter((album) => ["appears_on"].includes(album.album_group || ""))}
                limit={6}
            />
            <Spacer y={3} />
        </ClassicLayout>
    );
}
