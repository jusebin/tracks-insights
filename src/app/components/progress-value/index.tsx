import {Progress, Spacer, Text} from "@nextui-org/react";
import React from "react";
import {Box} from "@/app/components/box";

export default function ProgressValue({title, min, max, value}: {
    title: string;
    min: number;
    max: number;
    value?: number;
}) {
    return (
        <Box css={{w: "100%"}}>
            <Text color={"$gray800"} weight={"bold"}>{title}</Text>
            <Spacer y={0.5} />
            <Progress
                min={min}
                max={max}
                color={"primary"}
                value={value}
                indeterminated={value === undefined}
            />
        </Box>
    );
}
