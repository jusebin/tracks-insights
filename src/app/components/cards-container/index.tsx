import React from "react";
import {Row, Col, Grid, Link, Spacer, Text} from "@nextui-org/react";
import {TitleSection} from "@/app/components/titleSection";

export function CardsContainer({title, subtitle, children}: {
    title: string;
    subtitle: string;
    children: React.ReactNode
}) {
    return (
        <>
            <TitleSection title={title} subtitle={subtitle}/>
            <Grid.Container gap={2} justify={"flex-start"}>
                {children}
            </Grid.Container>
        </>
    )
}
