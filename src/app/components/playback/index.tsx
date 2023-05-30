import CurrentlyPlayingObject = SpotifyApi.CurrentlyPlayingObject;
import {TitleSection} from "@/app/components/titleSection";
import {Col, Image, Row, Text} from "@nextui-org/react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {getArtistsNames} from "@/app/helpers/getArtistsNames";
import {useTranslations} from "use-intl";

export function Playback({playbackState}: {
    playbackState: CurrentlyPlayingObject
}) {
    const t = useTranslations('Playback');
    const renderImage = (item: TrackObjectFull) => {
        return (
            <Image
                src={item.album.images[1].url}
                alt={`Track ${item.name} by ${item.artists[0].name}`}
            />
        )
    }

    const renderTitleData = (item: TrackObjectFull) => {
        return (
            <>
                <Text size={"$lg"}>{item.name}</Text>
                <Text css={{color: '$gray700'}}>{getArtistsNames(item.artists)}</Text>
            </>
        )
    }

    return (
        <section>
            <TitleSection title={t('currentlyPlaying')} />
            <div>
                <Row align={"center"}>
                    <Col css={{width: "100px"}}>
                        {renderImage(playbackState.item)}
                    </Col>
                    <Col css={{ml: '15px'}}>
                        {renderTitleData(playbackState.item)}
                    </Col>
                </Row>
            </div>
        </section>
    )
}
