import React from "react";
import {Col, Text} from "@nextui-org/react";

export default function ColValueTitle({value, label}: {
    value: string | number;
    label: string;
}) {
    return (
        <Col>
            <Text
                css={{ta: 'center'}}
                weight={"bold"}
                size={"$xl"}
            >{value}</Text>
            <Text
                css={{ta: 'center'}}
                color={"$gray800"}
                weight={"bold"}
            >
                {label}
            </Text>
        </Col>
    );
}
