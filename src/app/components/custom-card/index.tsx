import React from "react";
import {Link, Col, Row, Image, Text} from "@nextui-org/react";

export function CustomCard(
    {
        imageSrc,
        title,
        subtitle,
        position,
        url
    }: {
        imageSrc: string;
        title: string;
        subtitle?: string;
        position: number;
        url: string;
    }) {
    return (
        <Link href={url} css={{display: "block"}}>
            <div>
                <Image
                    showSkeleton
                    maxDelay={10000}
                    src={imageSrc}
                    width="100%"
                    height="100%"
                    alt={`cover`}
                    objectFit={"unset"}
                    css={{aspectRatio: "1 / 1"}}
                />
            </div>
            <div>
                <Row align={'center'} fluid>
                    <Col span={2}>
                        <Text
                            size={'$3xl'}
                            weight={'black'}
                        >{position}</Text>
                    </Col>
                    <Col span={10}>
                        <Text weight={'bold'} css={{ta: 'right'}}>{title}</Text>
                        {subtitle && <Text css={{ta: 'right'}}>{subtitle}</Text>}
                    </Col>
                </Row>
            </div>
        </Link>
    );
}
