import {Card, Link, Text} from "@nextui-org/react";
import Image from 'next/image'
import {Box} from "@/app/components/box";
import {getLineClampStyle} from "@/app/helpers/get-line-clamp-style";
import React from "react";

export default function CardImageLink({img, imgBlur, url, type, name, roundImg, ranking}: {
    img: string,
    imgBlur: string,
    url: string,
    type: string,
    name: string,
    roundImg?: boolean
    ranking?: number
}) {
    return (
        <Box css={{position: "relative"}}>
            <Card>
                <Card.Body>
                    <Box>
                        <Link href={url} css={{d: "block", w: "100%"}}>
                            <Box css={{
                                width: "100%",
                                height: 0,
                                paddingBottom: "100%",
                                overflow: "hidden",
                                position: "relative",
                                background: "$gray800",
                                borderRadius: roundImg ? '100%' : 0,
                                maxWidth: "217px",
                                maxHeight: "217px"
                            }}>
                                <Image
                                    src={img}
                                    alt={`cover for ${type} ${name}`}
                                    loading={"lazy"}
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                    placeholder={"blur"}
                                    blurDataURL={imgBlur}
                                />
                            </Box>
                            <Box css={{pt: '10px'}}>
                                <Text weight={"bold"} css={getLineClampStyle(1)}>{name}</Text>
                                <Text color={"$gray800"} size={"$sm"} css={{textTransform: "capitalize"}}>{type}</Text>
                            </Box>
                        </Link>
                    </Box>
                </Card.Body>
            </Card>
            {ranking && <>
                <Text
                    weight={"black"}
                    size={"$6xl"}
                    css={{
                        position: "absolute",
                        left: "-18px",
                        top: "-48px",
                        zIndex: 1
                    }}
                >{ranking}</Text>
                <Text
                    weight={"black"}
                    size={"$6xl"}
                    color={"primary"}
                    css={{
                        position: "absolute",
                        left: "-15px",
                        top: "-45px"
                    }}
                >{ranking}</Text>
            </>}
        </Box>
    )
}
