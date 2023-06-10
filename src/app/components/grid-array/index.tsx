import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import {Box} from "@/app/components/box";
import {TitleSection} from "../title-section";
import {Grid} from "@nextui-org/react";
import React from "react";
import ShowMoreOrLess from "../show-more-or-less";
import {useShow} from "@/app/hooks/use-show";
import CardImageLink from "../card-image-link";
import {useTranslations} from "use-intl";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;

export function GridArray({title, items, limit, ranking}: {
    title: string,
    items: AlbumObjectFull[] | AlbumObjectSimplified[] | ArtistObjectFull[] | TrackObjectFull[],
    limit: number
    ranking?: boolean
}) {
    const commonTranslation = useTranslations("Common");
    const {showMore, toggleShowMore} = useShow();

    const renderItems = () => {
        if (!items.length) {
            return null;
        }

        return items.slice(0, showMore ? items.length : limit).map((item: ArtistObjectFull | AlbumObjectSimplified | AlbumObjectFull | TrackObjectFull, index: number) => {
            const imgUrl = item.type === "track" ? item.album.images[0].url : item.images[0].url;
            const imgBlurUrl = item.type === "track" ? item.album.images[2].url : item.images[2].url;
            const preType = item.type === "album" ? `${new Date(item.release_date).getFullYear()} • ` : "";
            const type = commonTranslation(`types.${item.type === "album" ? item.album_type : item.type}`);

            return (
                <Grid key={`${title}--album${index}`} xs={6} sm={3} md={2}>
                    <CardImageLink
                        img={imgUrl}
                        imgBlur={imgBlurUrl}
                        url={`../${item.type}/${item.id}`}
                        type={`${preType}${type}`}
                        name={item.name}
                        roundImg={item.type === "artist"}
                        ranking={ranking ? index + 1 : undefined}
                    />
                </Grid>
            )
        });
    }

    return <Box>
        <TitleSection title={title} />
        <Grid.Container gap={2}>
            {renderItems()}
        </Grid.Container>
        {items.length > limit && <ShowMoreOrLess
            show={showMore}
            callback={toggleShowMore}
        />}
    </Box>
}
