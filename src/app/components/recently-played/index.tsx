'use client';

import {useRecentlyPlayed} from "@/app/hooks/useRecentlyPlayed";
import React from "react";
import {TitleSection} from "@/app/components/titleSection";
import {useTranslations} from "use-intl";
import {Col, Row, Image, Text, Spacer, Link} from "@nextui-org/react";
import {calcDate} from "@/app/helpers/calcDate";
import {TrackNameAndArtists} from "@/app/components/trackNameAndArtists";

export function RecentlyPlayed() {
    const titlesT = useTranslations('TitlesH2');
    const recentlyPlayedT = useTranslations("RecentlyPlayed");
    const limit = 30;
    const {recentlyPlayed} = useRecentlyPlayed(limit);

    const renderTracks = () => {
        if (recentlyPlayed) {
            return recentlyPlayed.items.map((item, index) => {
                const now = new Date();
                const dateTrackPlayed = new Date(item.played_at);
                const diffTime = now.getTime() - dateTrackPlayed.getTime();
                const timeData = calcDate(diffTime);

                const getTimeText = () => {
                    if (timeData.mins < 60) {
                        return recentlyPlayedT('mins', {number: timeData.mins});
                    }

                    if (timeData.hours < 24) {
                        return recentlyPlayedT('hours', {number: timeData.hours});
                    }

                    if (timeData.days < 365) {
                        return recentlyPlayedT('days', {number: timeData.days});
                    }
                }

                return (
                    <React.Fragment key={`recently-played-${index}`}>
                        <Row align={"center"} justify={"space-between"}>
                            <Col>
                                <Link href={`song/${item.track.id}`} css={{d: 'block'}}>
                                    <Row>
                                        <Col css={{width: '80px'}}>
                                            <Image width={60} src={item.track.album.images[0].url} alt={`cover ${item.track.name}`}/>
                                        </Col>
                                        <Col css={{pl: "10px"}}>
                                            <TrackNameAndArtists track={item.track} />
                                        </Col>
                                    </Row>
                                </Link>
                            </Col>
                            <Col css={{
                                '@xs': {
                                    d: 'none'
                                },
                                '@sm': {
                                    d: 'block'
                                }
                            }}>
                                <Link href={`album/${item.track.album.id}`}>
                                    <Text>{item.track.album.name}</Text>
                                </Link>
                            </Col>
                            <Col css={{ta: 'right'}}>
                                {getTimeText()}
                            </Col>
                        </Row>
                        <Spacer y={0.5} />
                    </React.Fragment>
                )
            });
        }
    }

    return (
        <section>
            <TitleSection title={titlesT('recentlyPlayed')}/>
            {renderTracks()}
            <Link href={"recently-played"}>
                <Text size={"$lg"}>{recentlyPlayedT("seeMore")}</Text>
            </Link>
        </section>
    );
}
