'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import ClassicLayout from "@/app/layouts/classic-layout";
import {useAlbum} from "@/app/hooks/use-album";
import {Row, Spacer} from "@nextui-org/react";
import {ColValueTitle} from "@/app/components/col-value-title";
import {useFormatter, useTranslations} from "use-intl";
import {getTracksDuration} from "@/app/helpers/get-tracks-duration";
import {TitleSection} from "@/app/components/title-section";
import {useAlbumTracks} from "@/app/hooks/use-album-tracks";
import TableTracks from "@/app/components/table-tracks";

export default function Album({params: {id}}: {
    params: Params
}) {
    const titlesTranslations = useTranslations("TitlesH2");
    const albumTranslations = useTranslations('Album');
    const format = useFormatter();

    const {album} = useAlbum(id);
    const {albumTracks, offset} = useAlbumTracks(id, album ? album.total_tracks : 0);

    if (!album) {
        return null;
    }

    return (
        <ClassicLayout
            type={"album"}
            name={album.name}
            imgSrc={album.images[0].url}
            url={album.external_urls.spotify}
        >
            <Row>
                <ColValueTitle value={album.label} label={albumTranslations('label')} />
                <ColValueTitle value={`${album.popularity} / 100`} label={albumTranslations('popularity')} />
                <ColValueTitle value={format.dateTime(new Date(album.release_date), {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })} label={albumTranslations('releaseDate')} />
                <ColValueTitle value={albumTracks.length} label={albumTranslations('tracks')} />
                <ColValueTitle value={getTracksDuration(albumTracks)} label={albumTranslations('duration')} />
            </Row>
            <Spacer y={2} />
            <TitleSection title={titlesTranslations("albumContent")} />
            {albumTracks.length && <TableTracks tracks={albumTracks} />}
        </ClassicLayout>
    );
}
