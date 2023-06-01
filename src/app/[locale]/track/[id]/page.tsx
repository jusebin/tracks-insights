'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {useTrack} from "@/app/hooks/useTrack";
import ItemLayout from "@/app/layouts/item-layout";
import React from "react";
import {Box} from "@/app/components/box";
import {useColor} from "@/app/hooks/useColor";
import {Card, Container, Grid, Image, Text, Row, Button, Link, Col, Spacer} from "@nextui-org/react";
import ArtistsLinks from "@/app/components/artists-links";
import {convertMsToMinutes} from "@/app/helpers/convertMsToMinutes";
import {useFormatter, useTranslations} from "use-intl";
import {AudioScore} from "@/app/components/audio-score";

export default function Track({params: {id}}: {
    params: Params
}) {
    const t = useTranslations('Song');
    const format = useFormatter();

    const {track} = useTrack(id);
    const {colors} = useColor({
        imageUrl: track ? track.album.images[0].url : '',
        amount: 1
    });

    if (!track) {
        return null;
    }

    console.log(track);

    return (
        <ItemLayout>
            <Box css={{
                linearGradient: `180deg, ${colors ? `
                hsl(${colors.h}, ${colors.s}%, ${colors.l}%)
                ` : "$gray900"} 60%, transparent 100%`,
                transition: "background ease 350ms"
            }}>
                <Row align={"center"} justify={"center"} css={{height: "40vh"}}>
                    <Grid.Container alignItems={"center"} gap={2} wrap={"nowrap"}>
                        <Grid>
                            <Card variant={"shadow"} css={{borderRadius: 0}}>
                                <Image
                                    width={235}
                                    src={track.album.images[0].url}
                                    alt={`Cover for track ${track.name}`}
                                />
                            </Card>
                        </Grid>
                        <Grid>
                            <Text weight={"bold"}>
                                <ArtistsLinks artists={track.artists} />
                            </Text>
                            <Text h1 weight={"black"}>{track.name}</Text>
                            <Button color={"primary"}>
                                <Link color="text" target={"_blank"} isExternal href={track.external_urls.spotify}>
                                    {t('openInSpotify')}
                                </Link>
                            </Button>
                        </Grid>
                    </Grid.Container>
                </Row>
            </Box>

            <Spacer y={3}></Spacer>

            <Box>
                <Row>
                    <Col>
                       <Text weight={"bold"} size={"$3lg"}>{convertMsToMinutes(track.duration_ms)}</Text>
                       <Text color={"$gray800"} weight={"bold"}>{t('duration')}</Text>
                    </Col>
                    <Col>
                        <Text weight={"bold"} size={"$3lg"}>{track.popularity}</Text>
                        <Text color={"$gray800"} weight={"bold"}>{t('popularity')}</Text>
                    </Col>
                    <Col>
                        <Text weight={"bold"} size={"$5lg"}>
                            {format.dateTime(new Date(track.album.release_date), {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })}
                        </Text>
                        <Text color={"$gray800"} weight={"bold"}>{t('releaseDate')}</Text>
                    </Col>
                </Row>
                <Spacer y={3} />
                <AudioScore id={track.id} />
            </Box>
        </ItemLayout>
    );
}
