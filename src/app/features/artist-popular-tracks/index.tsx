import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {TitleSection} from "../../components/title-section";
import {convertMsToMinutes} from "@/app/helpers/convertMsToMinutes";
import {Image, Text, Row, Col, Spacer, Link, Button} from "@nextui-org/react";
import React, {useState} from "react";
import {getLineClampStyle} from "@/app/helpers/getLineClampStyle";
import {Box} from "@/app/components/box";
import {useShow} from "@/app/hooks/useShow";
import ShowMoreOrLess from "../../components/show-more-or-less";

export function ArtistPopularTracks({tracks}: {
    tracks: TrackObjectFull[]
}) {
    // const [showMore, setShowMore] = useState(tracks.length > 5);
    const {showMore, toggleShowMore} = useShow(tracks.length > 5);

    const renderTracks = () => {
        if (!tracks.length) {
            return null;
        }

        return tracks.slice(0, showMore ? tracks.length : Math.floor(tracks.length / 2)).map((track, index) => {
            const imgWidth = 32;
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
                                    <Col css={{w: `${imgWidth}px`}}>
                                        <Image width={imgWidth} src={track.album.images[2].url} alt={`cover for title ${track.name}`}/>
                                    </Col>
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
