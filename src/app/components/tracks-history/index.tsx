import PlayHistoryObject = SpotifyApi.PlayHistoryObject;
import {calcDate} from "@/app/helpers/calcDate";
import {useTranslations} from "use-intl";
import React from "react";
import {Col, Image, Link, Row, Spacer, Text} from "@nextui-org/react";
import {TrackNameAndArtists} from "@/app/components/trackNameAndArtists";

export default function TracksHistory({itemsHistory, trackId}: {
    itemsHistory: PlayHistoryObject[],
    trackId?: string
}) {
    const recentlyPlayedT = useTranslations("RecentlyPlayed");
    const array = trackId ? itemsHistory.filter(
        (itemHistory) => itemHistory.track.id === trackId) : itemsHistory;

    const renderItemsHistory = () => {
        if (!array.length) {
            return null;
        }

        return array.map((item, index) => {
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
                            <Link href={`track/${item.track.id}`} css={{d: 'block'}}>
                                <Row>
                                    <Col css={{width: '80px'}}>
                                        <Image width={60} src={item.track.album.images[0].url}
                                               alt={`cover ${item.track.name}`}/>
                                    </Col>
                                    <Col css={{pl: "10px"}}>
                                        <TrackNameAndArtists track={item.track} lineClampArtist={1}
                                                             lineClampTrack={1}/>
                                    </Col>
                                </Row>
                            </Link>
                        </Col>
                        <Col css={{
                            '@smMax': {
                                d: 'none'
                            }
                        }}>
                            <Link href={`album/${item.track.album.id}`}>
                                <Text>{item.track.album.name}</Text>
                            </Link>
                        </Col>
                        <Col span={4} css={{ta: 'right'}}>
                            {getTimeText()}
                        </Col>
                    </Row>
                    <Spacer y={0.5}/>
                </React.Fragment>
            )
        });
    }

    return (
        <>
            {renderItemsHistory()}
        </>
    )
}
