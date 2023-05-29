import React from "react";
import {Card, Col, Row, Spacer, Text} from "@nextui-org/react";

export function CustomCard(
    {
        imageSrc,
        title,
        subtitle,
        position,
        addSpacer
    }: {
        imageSrc: string;
        title: string;
        subtitle?: string;
        position: number;
        addSpacer?: boolean;
    }) {
    return (
        <>
            <Card>
                <Card.Body css={{p: 0}}>
                    <Card.Image
                        src={imageSrc}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                    />
                </Card.Body>
                <Card.Footer
                    isBlurred
                    css={{
                        position: "absolute",
                        bgBlur: "#0f111466",
                        bottom: 0,
                        zIndex: 1,
                    }}
                >
                    <Row align={'center'}>
                        <Col span={2}>
                            <Text
                                size={'$3xl'}
                                weight={'black'}
                            >{position}</Text>
                        </Col>
                        <Col>
                            <Text weight={'bold'} css={{ta: 'right'}}>{title}</Text>
                            {subtitle && <Text css={{ta: 'right'}}>{subtitle}</Text>}
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </>
    );
}
