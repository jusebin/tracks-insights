
import AudioFeaturesObject = SpotifyApi.AudioFeaturesObject;
import React from "react";
import {Card, Col, Grid, Progress, Row, Spacer, Text} from "@nextui-org/react";
import {getAudioScore} from "@/app/helpers/getAudioScore";
import {TitleSection} from "@/app/components/titleSection";
import {useTranslations} from "use-intl";

export function AudioScore({audioFeatures}: {
    audioFeatures: AudioFeaturesObject[]
}) {
    const titleT = useTranslations("TitlesH2");
    const audioT = useTranslations('AudioFeatures');

    const acousticness = getAudioScore('acousticness', audioFeatures);
    const danceability = getAudioScore('danceability', audioFeatures);
    const energy = getAudioScore('energy', audioFeatures);
    const instrumentalness = getAudioScore('instrumentalness', audioFeatures);
    const key = getAudioScore('key', audioFeatures);
    const liveness = getAudioScore('liveness', audioFeatures);
    const loudness = getAudioScore('loudness', audioFeatures);
    const mode = getAudioScore('mode', audioFeatures);
    const speechiness = getAudioScore('speechiness', audioFeatures);
    const tempo = getAudioScore('tempo', audioFeatures);
    const timeSignature = getAudioScore('time_signature', audioFeatures);
    const valence = getAudioScore('valence', audioFeatures);

    console.log(audioFeatures[0]);

    return (
        <section>
            <TitleSection title={titleT('audioFeatures')} />
            <Row gap={1} wrap={"wrap"}>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.acousticness")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={acousticness} />
                    </div>
                </Col>

                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.danceability")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={danceability} />
                    </div>
                </Col>

                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.energy")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={energy} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.instrumentalness")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={instrumentalness} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.liveness")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={liveness} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.loudness")}</Text>
                        <Progress min={-60} max={0} color={"primary"} value={loudness} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.speechiness")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={speechiness} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.valence")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={valence} />
                    </div>
                </Col>
            </Row>

            <Spacer y={3} />

            <Grid.Container gap={2}>
                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{loudness.toFixed(1)}</Text>
                            <Text>{audioT("titles.loudness")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{key}</Text>
                            <Text>{audioT("titles.key")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{mode}</Text>
                            <Text>{audioT("titles.mode")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{timeSignature}</Text>
                            <Text>{audioT("titles.timeSignature")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{tempo.toFixed(1)}</Text>
                            <Text>{audioT("titles.tempo")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </section>
    )
}
