import React from "react";
import {Row, Spacer, Text} from "@nextui-org/react";

export function CardsContainer({title, subtitle, children}: {
    title: string;
    subtitle: string;
    children: React.ReactNode
}) {
    return (
        <>
            <Text h2>{title}</Text>
            <Text>{subtitle}</Text>
            <Spacer y={1}/>
            <Row wrap={'wrap'}>
                {children}
            </Row>
        </>
    )
}
