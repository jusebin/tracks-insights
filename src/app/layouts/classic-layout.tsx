'use client';

import React, {useCallback} from "react";
import Header from "@/app/components/header/header";
import {Box} from "@/app/components/box";
import CustomContainer from "@/app/components/custom-container";
import {Row, Grid, Spacer, Text, Image, Button, Link, Avatar} from "@nextui-org/react";
import {useTranslations} from "use-intl";
import {useColor} from "@/app/hooks/use-color";

export default function ClassicLayout(
    {
        children,
        type,
        name,
        url,
        imgSrc,
    }: {
        children: React.ReactNode
        type: 'user' | 'artist' | 'album' | 'track' | 'single' | 'compilation',
        name: string,
        url: string,
        imgSrc?: string,
    }) {
    const commonTranslations = useTranslations("Common");
    const t = useTranslations('Song');
    const pictureWidth = 235;
    const {colors} = useColor({
        imageUrl: imgSrc,
        amount: 1
    });

    const renderHeaderLayoutImage = useCallback(() => {
        switch (type) {
            case 'user':
                return (
                    <Avatar
                        src={imgSrc}
                        text={!imgSrc ? name.charAt(0) : undefined}
                        css={{
                            w: `${pictureWidth}px`,
                            h: `${pictureWidth}px`,
                            m: "0 auto"
                        }}
                    />
                );
            default:
                return (
                    <>
                        {imgSrc && <Image
                            width={pictureWidth}
                            src={imgSrc}
                            alt={`Cover for ${type} ${name}`}
                        />}
                    </>
                )
        }
    }, [imgSrc, name, type]);

    return (
        <Box css={{w: "100vw", marginTop: "-75px", pt: "75px"}}>
            <Header/>
            <Box>
                <Box css={{
                    linearGradient: `180deg, ${colors ? colors : "$secondary"} 50%, transparent 100%`
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
                                        },
                                        "@sm": {
                                            w: "235px"
                                        },
                                        p: 0
                                    }}
                                >
                                    {renderHeaderLayoutImage()}
                                </Grid>
                                <Grid
                                    css={{
                                        "@smMax": {
                                            w: "100%",
                                            ta: "center"
                                        },
                                        "@sm": {
                                            w: "calc(100% - 235px)",
                                            pl: "35px"
                                        }
                                    }}
                                >
                                    <Text weight={"bold"}>{commonTranslations(`types.${type}`)}</Text>
                                    <Text h1 weight={"black"}>{name}</Text>
                                    <Button
                                        color={"primary"}
                                        css={{
                                            "@smMax": {
                                                m: "0 auto",
                                            }
                                        }}
                                    >
                                        <Link css={{color: "black"}} target={"_blank"} isExternal href={url}>
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
                    {children}
                </CustomContainer>
            </Box>
        </Box>
    )
}
