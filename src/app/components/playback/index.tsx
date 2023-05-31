import {TitleSection} from "@/app/components/titleSection";
import {Col, Image, Row, Text} from "@nextui-org/react";
import {getArtistsNames} from "@/app/helpers/getArtistsNames";
import {useTranslations} from "use-intl";
import {useTrack} from "@/app/hooks/useTrack";

export function Playback({id}: {
    id: string
}) {
    const {track} = useTrack(id);
    const t = useTranslations('Playback');
    const renderImage = () => {
        if (!track) {
            return null;
        }

        return (
            <Image
                src={track.album.images[1].url}
                alt={`Track ${track.name} by ${track.artists[0].name}`}
            />
        )
    }

    const renderTitleData = () => {
        if (!track) {
            return null;
        }

        return (
            <>
                <Text size={"$lg"}>{track.name}</Text>
                <Text css={{color: '$gray700'}}>{getArtistsNames(track.artists)}</Text>
            </>
        )
    }

    return (
        <section>
            <TitleSection title={t('currentlyPlaying')} />
            <div>
                <Row align={"center"}>
                    <Col css={{width: "100px"}}>
                        {renderImage()}
                    </Col>
                    <Col css={{ml: '15px'}}>
                        {renderTitleData()}
                    </Col>
                </Row>
            </div>
        </section>
    )
}
