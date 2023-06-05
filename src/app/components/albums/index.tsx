import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import {Box} from "@/app/components/box";
import {TitleSection} from "@/app/components/titleSection";
import {Grid} from "@nextui-org/react";
import React from "react";
import ShowMoreOrLess from "@/app/components/showMoreOrLess";
import {useShow} from "@/app/hooks/useShow";
import CardImageLink from "@/app/components/cardImageLink";
import {useTranslations} from "use-intl";

export function Albums({title, albums, filters = []}: {
    title: string,
    albums: AlbumObjectFull[],
    filters?: string[]
}) {
    const commonTranslation = useTranslations("Common");
    const {showMore, toggleShowMore} = useShow();
    const filteredAlbums = (filters.length && albums.length) ? albums.filter(album => filters.includes(album.album_group || '')) : albums;
    const renderAlbums = () => {
        if (!filteredAlbums.length) {
            return null;
        }

        console.log(albums);

        return filteredAlbums.slice(0, showMore ? filteredAlbums.length : 6).map((album, index) => {
            return (
                <Grid key={`${title}--album${index}`} xs={6} sm={3} md={2}>
                    <CardImageLink
                        img={album.images[0].url}
                        url={`../album/${album.id}`}
                        type={`${new Date(album.release_date).getFullYear()} • ${commonTranslation(`types.${album.album_type}`)}`}
                        name={album.name}
                    />
                </Grid>
            )
        });
    }

    return <Box>
        <TitleSection title={title} />
        <Grid.Container gap={2}>
            {renderAlbums()}
        </Grid.Container>
        {filteredAlbums.length > 6 && <ShowMoreOrLess
            show={showMore}
            callback={toggleShowMore}
        />}
    </Box>
}
