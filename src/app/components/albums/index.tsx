import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import {Box} from "@/app/components/box";
import {TitleSection} from "@/app/components/titleSection";
import {Card, Grid, Image, Text, Button, Link} from "@nextui-org/react";
import React, {useState} from "react";
import {getLineClampStyle} from "@/app/helpers/getLineClampStyle";
import {useTranslations} from "use-intl";
import ShowMoreOrLess from "@/app/components/showMoreOrLess";
import {useShow} from "@/app/hooks/useShow";

export function Albums({title, albums, filters = []}: {
    title: string,
    albums: AlbumObjectFull[],
    filters?: string[]
}) {
    const {showMore, toggleShowMore} = useShow();
    const filteredAlbums = (filters.length && albums.length) ? albums.filter(album => filters.includes(album.album_group || '')) : albums;
    const renderAlbums = () => {
        if (!filteredAlbums.length) {
            return null;
        }

        return filteredAlbums.slice(0, showMore ? filteredAlbums.length : 6).map((album, index) => {
            return (
                <Grid key={`${title}--album${index}`} xs={2}>
                    <Card>
                        <Card.Body>
                            <Image width={177} src={album.images[0].url} alt={`cover for album ${album.name}`} />
                            <Box css={{pt: '10px'}}>
                                <Text weight={"bold"} css={getLineClampStyle(1)}>{album.name}</Text>
                                <Text color={"$gray800"} size={"$sm"} css={{textTransform: "capitalize"}}>{new Date(album.release_date).getFullYear()} &bull; {album.album_type}</Text>
                            </Box>
                        </Card.Body>
                    </Card>
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
