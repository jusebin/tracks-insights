import React from "react";
import {Card, Col, Row, Spacer, Text} from "@nextui-org/react";

export function CustomCard(
    {
        cardType,
        imageSrc,
        imageWidth,
        imageHeight,
        title,
        subtitle,
        position,
        addSpacer
    }: {
        cardType: string;
        imageSrc: string;
        imageWidth: number;
        imageHeight: number;
        title: string;
        subtitle?: string;
        position: number;
        addSpacer?: boolean;
    }) {
    return (
        <React.Fragment key={`${cardType}-${position}`}>
            <Col>
                <Card css={{width: '100%', maxWidth: '340px', boxSizing: 'border-box'}}>
                    <Card.Image
                        src={imageSrc}
                        width={imageWidth}
                        height={imageHeight}
                    />
                    <Card.Body>
                        <Row align={'center'} gap={1}>
                            <Col span={2}>
                                <Text
                                    size={'$3xl'}
                                    weight={'bold'}
                                >{position}</Text>
                            </Col>
                            <Col span={10}>
                                <Text weight={'bold'}>{title}</Text>
                                {subtitle && <Text>{subtitle}</Text>}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {addSpacer && <Spacer y={1}/>}
            </Col>
        </React.Fragment>
    );
}
