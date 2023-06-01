
import AudioFeaturesObject = SpotifyApi.AudioFeaturesObject;
import React from "react";
import {Card, Col, Grid, Progress, Row, Spacer, Text} from "@nextui-org/react";
import {TitleSection} from "@/app/components/titleSection";
import {useTranslations} from "use-intl";
import {useAudioFeatures} from "@/app/hooks/useAudioFeatures";

export function AudioScore({id}: {
    id: string
}) {
    const titleT = useTranslations("TitlesH2");
    const audioT = useTranslations('AudioFeatures');

    const {audioFeatures} = useAudioFeatures(id);

    console.log(audioFeatures);

    return (
        <section>
            <TitleSection title={titleT('audioFeatures')} />
            <Row gap={1} wrap={"wrap"}>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.acousticness")}</Text>
                        <Progress
                            min={0}
                            max={1}
                            color={"primary"}
                            value={audioFeatures?.acousticness}
                            indeterminated={audioFeatures === undefined}
                        />
                    </div>
                </Col>

                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.danceability")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={audioFeatures?.danceability} indeterminated={audioFeatures === undefined} />
                    </div>
                </Col>

                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.energy")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={audioFeatures?.energy} indeterminated={audioFeatures === undefined} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.instrumentalness")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={audioFeatures?.instrumentalness} indeterminated={audioFeatures === undefined} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.liveness")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={audioFeatures?.liveness} indeterminated={audioFeatures === undefined} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.loudness")}</Text>
                        <Progress min={-60} max={0} color={"primary"} value={audioFeatures?.loudness} indeterminated={audioFeatures === undefined} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.speechiness")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={audioFeatures?.speechiness} indeterminated={audioFeatures === undefined} />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Text>{audioT("titles.valence")}</Text>
                        <Progress min={0} max={1} color={"primary"} value={audioFeatures?.valence} indeterminated={audioFeatures === undefined} />
                    </div>
                </Col>
            </Row>

            <Spacer y={3} />

            <Grid.Container gap={2}>
                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text weight={"bold"} size={"$2xl"} color={"primary"}>{audioFeatures?.loudness.toFixed(1)}</Text>
                            <Text>{audioT("titles.loudness")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{audioFeatures?.key}</Text>
                            <Text>{audioT("titles.key")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{audioFeatures?.mode}</Text>
                            <Text>{audioT("titles.mode")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{audioFeatures?.timeSignature}</Text>
                            <Text>{audioT("titles.timeSignature")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <Card.Body css={{ta: 'center'}}>
                            <Text color={"primary"}>{audioFeatures?.tempo.toFixed(1)}</Text>
                            <Text>{audioT("titles.tempo")}</Text>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </section>
    )
}
