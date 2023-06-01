import {Card, Text} from "@nextui-org/react";
import React from "react";

export default function CardValueTitle({value, title}: {
    value?: string | number;
    title: string;
}) {
    return (
        <Card>
            <Card.Body css={{ta: 'center'}}>
                <Text weight={"bold"} size={"$2xl"} color={"primary"}>{value ? value : '-'}</Text>
                <Text>{title}</Text>
            </Card.Body>
        </Card>
    );
}
