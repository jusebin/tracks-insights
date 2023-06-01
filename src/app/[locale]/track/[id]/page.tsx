'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {useTrack} from "@/app/hooks/useTrack";
import ItemLayout from "@/app/layouts/item-layout";
import React from "react";
import {Box} from "@/app/components/box";
import {useColor} from "@/app/hooks/useColor";
import {Grid, Image, Text, Row, Button, Link, Col, Spacer, Container} from "@nextui-org/react";
import ArtistsLinks from "@/app/components/artists-links";
import {convertMsToMinutes} from "@/app/helpers/convertMsToMinutes";
import {useFormatter, useTranslations} from "use-intl";
import {AudioScore} from "@/app/features/audio-score";
import CustomContainer from "@/app/components/custom-container";

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

    console.log(colors);
    return (
        <ItemLayout>
            <Box css={{
                linearGradient: `180deg, ${colors ? `
                hsl(${colors.h}, ${colors.s}%, ${colors.l}%)
                ` : "$gray900"} 60%, transparent 100%`,
                transition: "background ease 350ms"
            }}>
                <CustomContainer>
                    <Row
                        align={"center"}
                        justify={"center"}
                        css={{
                            minHeight: "40vh"
                        }}
                    >
                        <Grid.Container
                            alignItems={"center"}
                            gap={2}
                            css={{
                                "@sm": {
                                    wrap: "nowrap"
                                }
                            }}
                        >
                            <Grid
                                css={{
                                    "@smMax": {
                                        w: "100%"
                                    }
                                }}
                            >
                                <Image
                                    width={235}
                                    src={track.album.images[0].url}
                                    alt={`Cover for track ${track.name}`}
                                />
                            </Grid>
                            <Grid
                                css={{
                                    "@smMax": {
                                        w: "100%",
                                        ta: "center"
                                    }
                                }}
                            >
                                <Text weight={"bold"}>
                                    <ArtistsLinks artists={track.artists}/>
                                </Text>
                                <Text h1 weight={"black"}>{track.name}</Text>
                                <Button
                                    color={"primary"}
                                    css={{
                                        "@smMax": {
                                            m: "0 auto"
                                        }
                                    }}
                                >
                                    <Link color="text" target={"_blank"} isExternal href={track.external_urls.spotify}>
                                        {t('openInSpotify')}
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid.Container>
                    </Row>
                </CustomContainer>
            </Box>

            <Spacer y={3}></Spacer>

            <CustomContainer>
                <Row>
                    <Col>
                        <Text css={{ta: 'center'}} weight={"bold"}
                              size={"$xl"}>{convertMsToMinutes(track.duration_ms)}</Text>
                        <Text css={{ta: 'center'}} color={"$gray800"} weight={"bold"}>{t('duration')}</Text>
                    </Col>
                    <Col>
                        <Text css={{ta: 'center'}} weight={"bold"} size={"$xl"}>{track.popularity} / 100</Text>
                        <Text css={{ta: 'center'}} color={"$gray800"} weight={"bold"}>{t('popularity')}</Text>
                    </Col>
                    <Col>
                        <Text css={{ta: 'center'}} weight={"bold"} size={"$xl"}>
                            {format.dateTime(new Date(track.album.release_date), {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })}
                        </Text>
                        <Text css={{ta: 'center'}} color={"$gray800"} weight={"bold"}>{t('releaseDate')}</Text>
                    </Col>
                </Row>
                <Spacer y={3}/>
                <AudioScore id={track.id}/>
            </CustomContainer>
        </ItemLayout>
    );
}
