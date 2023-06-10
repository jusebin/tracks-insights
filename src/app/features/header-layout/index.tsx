import React, {useCallback} from "react";
import {Avatar, Button, Grid, Link, Row, Text} from "@nextui-org/react";
import {Box} from "@/app/components/box";
import Image from "next/image";
import CustomContainer from "@/app/components/custom-container";
import {useTranslations} from "use-intl";
import {useColor} from "@/app/hooks/use-color";
import Header from "@/app/components/header/header";

export default function HeaderLayout(
    {
        type,
        name,
        url,
        imgSrc,
    }: {
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
                const textLabel = name?.charAt(0) || '';
                return (
                    <Avatar
                        src={imgSrc}
                        text={!imgSrc ? textLabel : undefined}
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
                        {imgSrc &&
                            <Box css={{
                                borderRadius: type === 'artist' ? "100%" : 0,
                                position: "relative",
                                height: 0,
                                width: "100%",
                                overflow: "hidden",
                                pb: "100%"
                            }}>
                                <Box css={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    background: "$gray800"
                                }}>
                                    <Image
                                        width={pictureWidth}
                                        height={pictureWidth}
                                        src={imgSrc}
                                        alt={`Cover for ${type} ${name}`}
                                        priority={true}
                                    />
                                </Box>
                            </Box>
                        }
                    </>
                )
        }
    }, [imgSrc, name, type]);

    return (
        <>
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
                                    <Link color={"text"} target={"_blank"} isExternal href={url}>
                                        {t('openInSpotify')}
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid.Container>
                    </Row>
                </CustomContainer>
            </Box>
        </>

    )
}
