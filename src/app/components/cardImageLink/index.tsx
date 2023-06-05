import {Card, Image, Link, Text} from "@nextui-org/react";
import {Box} from "@/app/components/box";
import {getLineClampStyle} from "@/app/helpers/getLineClampStyle";
import React, {ReactElement} from "react";

export default function CardImageLink({img, url, type, name, roundImg, children}: {
    img: string,
    url: string,
    type: string,
    name: string,
    roundImg?: boolean
    children?: React.ReactElement
}) {
    const renderBottomPart = () => {
        if (children) {
            return (
                <>
                    {children}
                </>
            )
        }

        return (
            <>
                <Text weight={"bold"} css={getLineClampStyle(1)}>{name}</Text>
                <Text color={"$gray800"} size={"$sm"} css={{textTransform: "capitalize"}}>{type}</Text>
            </>
        )
    }

    return (
        <Card>
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
                            {renderBottomPart()}
                        </Box>
                    </Link>
                </Box>

            </Card.Body>
        </Card>
    )
}
