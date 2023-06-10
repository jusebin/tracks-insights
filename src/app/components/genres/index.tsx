import {Badge, Row, Spacer} from "@nextui-org/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import React, {useMemo} from "react";
import TitleSection from "../title-section";
import {TimeRange} from "@/app/constants/time-ranges";
import {useTranslations} from "use-intl";
import {Box} from "@/app/components/box";
import ProgressValue from "@/app/components/progress-value";
import ShowMoreOrLess from "@/app/components/show-more-or-less";
import {useShow} from "@/app/hooks/use-show";

interface Genre {
    score: number;
    label: string;
}

export function Genres({artists, timeRange}: {
    artists: ArtistObjectFull[],
    timeRange: TimeRange
}) {
    const {showMore, toggleShowMore} = useShow();
    const handleTimeRangeT = useTranslations('HandleTimeRange');
    const titleT = useTranslations('TitlesH2');

    const genres: Genre[] = useMemo(() => {
        const temp: Genre[] = [];

        for (const artist of artists) {
            for (const genre of artist.genres) {
                const tempItem = temp.find((item) => item.label === genre);

                if (tempItem) {
                    tempItem.score += 1;
                } else {
                    temp.push({
                        label: genre,
                        score: 1
                    });
                }
            }
        }

        return temp;
    }, [artists]);
    const renderGenres = () => {
        return genres.map((genre, index) => {
            return <Badge key={`badge-genre-${index}`} variant={"flat"} css={{mb: '5px'}}>
                {genre.label} ({genre.score})
            </Badge>
        });
    }

    const renderGenreProgress = () => {
        const sorted = genres.sort((a, b) => b.score - a.score);
        const limit = showMore ? genres.length : 5;

        return sorted.slice(0, limit).map((genre, index) => {
            return (
                <React.Fragment key={`genre--${genre.label}--${index}`}>
                    <ProgressValue title={genre.label} min={0} max={genres.length} value={genre.score} />
                    {index < limit - 1 && <Spacer y={1} />}
                </React.Fragment>
            )
        });
    }

    return (
        <section>
            <TitleSection
                title={titleT("topGenres")}
                subtitle={handleTimeRangeT(timeRange.labelKey)}
            />
            <Row wrap={"wrap"} justify={"center"}>
                {renderGenres()}
            </Row>

            <Spacer y={2} />

            <Box>
                {renderGenreProgress()}
                <ShowMoreOrLess show={showMore} callback={toggleShowMore} />
            </Box>
        </section>
    )
}
