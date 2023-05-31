import {TitleSection} from "@/app/components/titleSection";
import {Card, Col, Image, Link, Row, Text} from "@nextui-org/react";
import {useTranslations} from "use-intl";
import {useTrack} from "@/app/hooks/useTrack";
import React from "react";
import {TrackNameAndArtists} from "@/app/components/trackNameAndArtists";

export function Playback({id}: {
    id: string
}) {
    const {track} = useTrack(id);
    const t = useTranslations('Playback');
    const renderImage = () => {
        if (!track) {
            return null;
        }

        return (
            <Image
                src={track.album.images[1].url}
                alt={`Track ${track.name} by ${track.artists[0].name}`}
            />
        )
    }

    const renderTitleData = () => {
        if (!track) {
            return null;
        }

        return (
            <TrackNameAndArtists track={track} isBold={true}/>
        )
    }

    if (!track) {
        return null;
    }

    return (
        <section>
            <TitleSection title={t('currentlyPlaying')}/>
            <Link block href={`song/${track.id}`}>
                <Card>
                    <Card.Body>
                        <Row align={"center"}>
                            <Col css={{width: "100px"}}>
                                {renderImage()}
                            </Col>
                            <Col css={{ml: '15px'}}>
                                {renderTitleData()}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Link>
        </section>
    )
}
