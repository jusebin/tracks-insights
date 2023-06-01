import {TitleSection} from "@/app/components/titleSection";
import {Card, Col, Image, Link, Row} from "@nextui-org/react";
import {useTranslations} from "use-intl";
import {useTrack} from "@/app/hooks/useTrack";
import React from "react";
import {TrackNameAndArtists} from "@/app/components/trackNameAndArtists";

export function Playback({id}: {
    id: string
}) {
    const {track} = useTrack(id);
    const t = useTranslations('Playback');

    if (!track) {
        return null;
    }

    return (
        <section>
            <TitleSection title={t('currentlyPlaying')}/>
            <Link href={`track/${track.id}`}>
                <Card>
                    <Card.Body>
                        <Row align={"center"}>
                            <Col css={{width: "100px"}}>
                                <Image
                                    src={track.album.images[1].url}
                                    alt={`Track ${track.name} by ${track.artists[0].name}`}
                                />
                            </Col>
                            <Col css={{ml: '15px'}}>
                                <TrackNameAndArtists track={track} isBold={true}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Link>
        </section>
    )
}
