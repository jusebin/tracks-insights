import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {TitleSection} from "../../components/title-section";
import {convertMsToMinutes} from "@/app/helpers/convert-ms-to-minutes";
import Image from "next/image";
import {Text, Row, Col, Spacer, Link} from "@nextui-org/react";
import React from "react";
import {getLineClampStyle} from "@/app/helpers/get-line-clamp-style";
import {useShow} from "@/app/hooks/use-show";
import ShowMoreOrLess from "../../components/show-more-or-less";
import {Box} from "@/app/components/box";

export function ArtistPopularTracks({tracks}: {
    tracks: TrackObjectFull[]
}) {
    const {showMore, toggleShowMore} = useShow(tracks.length > 5);

    const renderTracks = () => {
        if (!tracks.length) {
            return null;
        }

        return tracks.slice(0, showMore ? tracks.length : Math.floor(tracks.length / 2)).map((track, index) => {
            const imgSize = 32;
            const numberWidth = 30;

            return (
                <React.Fragment key={`track--${index}`}>
                    <Link block href={`../track/${track.id}`}>
                        <Row align={"center"}>
                            <Col css={{w: `${numberWidth}px`}}>
                                <Text color={"$gray800"}>{index + 1}</Text>
                            </Col>
                            <Col css={{w: `calc(75vw - ${numberWidth}px)`}}>
                                <Row align={"center"}>
                                    <Image
                                        width={32}
                                        height={32}
                                        sizes="100vw"
                                        src={track.album.images[2].url}
                                        alt={`cover for title ${track.name}`}
                                    />
                                    <Col css={{pl: '15px'}}>
                                        <Text css={getLineClampStyle(1)}>{track.name}</Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col css={{w: `calc(25vw - 70px)`}}>
                                <Text css={{ta: 'right'}}>{convertMsToMinutes(track.duration_ms)}</Text>
                            </Col>
                        </Row>
                    </Link>
                    {index < tracks.length - 1 && <Spacer y={1} />}
                </React.Fragment>
            );
        })
    };

    return (
        <>
            <TitleSection title={"Popular tracks"}/>
            {renderTracks()}
            {tracks.length > 5 && <ShowMoreOrLess
                show={showMore}
                callback={toggleShowMore}
            />}
        </>
    )
}
