import React, {useCallback} from "react";
import Header from "@/app/components/header/header";
import {Box} from "@/app/components/box";
import CustomContainer from "@/app/components/custom-container";
import {Row, Grid, Spacer, Text, Image, Button, Link, Avatar, useTheme, theme} from "@nextui-org/react";
import {useTranslations} from "use-intl";
import {useColor} from "@/app/hooks/useColor";
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;
import ArtistsLinks from "@/app/components/artists-links";

export default function ClassicLayout(
    {
        children,
        type,
        name,
        url,
        imgSrc,
        trackArtists = []
    }: {
        children: React.ReactNode
        type: 'profile' | 'artist' | 'album' | 'track',
        name: string,
        url: string,
        imgSrc?: string,
        trackArtists?: ArtistObjectSimplified[]
    }) {
    const t = useTranslations('Song');
    const pictureWidth = 235;


    const renderHeaderLayoutImage = useCallback(() => {
        switch (type) {
            case 'profile':
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

    const renderHeaderLayoutData = useCallback(() => {
        switch (type) {
            case 'track':
                return (
                    <Text weight={"bold"}>
                        <ArtistsLinks artists={trackArtists}/>
                    </Text>
                )
            default:
                return (
                    <></>
                );
        }
    }, [type, trackArtists]);

    // const themeUsed = useTheme();

    const {colors} = useColor({
        imageUrl: imgSrc,
        amount: 1
    });

    return (
        <>
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
                                        }
                                    }}
                                >
                                    {renderHeaderLayoutData()}
                                    <Text h1 weight={"black"}>{name}</Text>
                                    <Button
                                        color={"primary"}
                                        css={{
                                            "@smMax": {
                                                m: "0 auto"
                                            }
                                        }}
                                    >
                                        <Link color="text" target={"_blank"} isExternal href={url}>
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
        </>
    )
}
