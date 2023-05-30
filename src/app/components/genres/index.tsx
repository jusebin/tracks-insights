import {Badge, Row} from "@nextui-org/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import {useMemo} from "react";
import {TitleSection} from "@/app/components/titleSection";
import {TimeRange} from "@/app/constants/timeRanges";
import {useTranslations} from "use-intl";

export function Genres({artists, timeRange}: {
    artists: ArtistObjectFull[],
    timeRange: TimeRange
}) {
    const handleTimeRangeT = useTranslations('HandleTimeRange');
    const titleT = useTranslations('TitlesH2');

    const availableGenres = useMemo(() => {
        const temp: string[] = [];

        for (const artist of artists) {
            for (const genre of artist.genres) {
                if (!temp.includes(genre)) {
                    temp.push(genre);
                }
            }
        }

        return temp;
    }, [artists]);
    const renderGenres = () => {
        return availableGenres.map((genre, index) => {
            return <Badge key={`badge-genre-${index}`} variant={"flat"} css={{mb: '5px'}}>
                {genre}
            </Badge>
        });
    }

    return (
        <section>
            <TitleSection title={titleT("topGenres")} subtitle={handleTimeRangeT(timeRange.labelKey)} />
            <Row wrap={"wrap"} justify={"center"}>
                {renderGenres()}
            </Row>
        </section>
    )
}
