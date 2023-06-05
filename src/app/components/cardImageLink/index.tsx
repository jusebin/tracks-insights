import {Card, Col, Image, Link, Row, Text} from "@nextui-org/react";
import {Box} from "@/app/components/box";
import {getLineClampStyle} from "@/app/helpers/getLineClampStyle";
import React from "react";

export default function CardImageLink({img, url, type, name, roundImg, ranking}: {
    img: string,
    url: string,
    type: string,
    name: string,
    roundImg?: boolean
    ranking?: number
}) {
    return (
        <Box css={{position: "relative"}}>
            <Card >
                <Card.Body>
                    <Box>
                        <Link href={url} css={{d: "block", w: "100%"}}>
                            <Box css={{
                                height: 0,
                                paddingBottom: "100%",
                                overflow: "hidden",
                                position: "relative"
                            }}>
                                <Image
                                    src={img}
                                    alt={`cover for ${type} ${name}`}
                                    css={{
                                        borderRadius: roundImg ? '100%' : 0,
                                        aspectRatio: "1/1",
                                        objectFit: "cover"
                                    }}
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
