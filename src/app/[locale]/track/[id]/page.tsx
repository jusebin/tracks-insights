'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {useTrack} from "@/app/hooks/useTrack";
import ItemLayout from "@/app/layouts/item-layout";
import React from "react";
import {Box} from "@/app/components/box";
import {useColor} from "@/app/hooks/useColor";
import {Grid, Image, Text, Row, Button, Link, Col, Spacer} from "@nextui-org/react";
import ArtistsLinks from "@/app/components/artists-links";
import {convertMsToMinutes} from "@/app/helpers/convertMsToMinutes";
import {useFormatter, useTranslations} from "use-intl";
import {AudioScore} from "@/app/features/audio-score";
import CustomContainer from "@/app/components/custom-container";
import ClassicLayout from "@/app/layouts/classic-layout";
import {ColValueTitle} from "@/app/components/col-value-title";

export default function Track({params: {id}}: {
    params: Params
}) {
    const t = useTranslations('Song');
    const format = useFormatter();

    const {track} = useTrack(id);

    if (!track) {
        return null;
    }

    return (
        <ClassicLayout
            type={'track'}
            name={track.name}
            url={track.external_urls.spotify}
            imgSrc={track.album.images[0].url}
            trackArtists={track.artists}
        >
            <>
                <Row>
                    <ColValueTitle value={convertMsToMinutes(track.duration_ms)} label={t('duration')} />
                    <ColValueTitle value={`${track.popularity} / 100`} label={t('popularity')} />
                    <ColValueTitle
                        value={
                            format.dateTime(new Date(track.album.release_date), {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })
                        }
                        label={t('releaseDate')}
                    />
                </Row>
                <Spacer y={3}/>
                <AudioScore id={track.id}/>
            </>
        </ClassicLayout>
    );
}
