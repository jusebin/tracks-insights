import TitleSection from "../../components/title-section";
import Image from "next/image";
import {Card, Col, Row} from "@nextui-org/react";
import {useTranslations} from "use-intl";
import useTrack from "@/app/hooks/use-track";
import React from "react";
import {TrackNameAndArtists} from "../../components/track-name-and-artists";
import {Box} from "@/app/components/box";

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
            <Card css={{maxWidth: "300px"}}>
                <Card.Body>
                    <Row align={"center"}>
                        <Col css={{width: "100px"}}>
                            <Box css={{w: "64px"}}>
                                <Image
                                    width={64}
                                    height={64}
                                    src={track.album.images[1].url}
                                    alt={`Track ${track.name} by ${track.artists[0].name}`}
                                />
                            </Box>
                        </Col>
                        <Col css={{ml: '15px'}}>
                            <TrackNameAndArtists
                                track={track}
                                isBold={true}
                                lineClampArtist={1}
                                lineClampTrack={1}
                                withLink
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </section>
    )
}
