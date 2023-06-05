import React from "react";
import {Text, Spacer} from "@nextui-org/react";

export function TitleSection({title, subtitle}: {
    title: string,
    subtitle?: string
}) {
    return (
        <>
            <Text h2>{title}</Text>
            {subtitle && <Text>{subtitle}</Text>}
            <Spacer y={1} />
        </>
    )
}
