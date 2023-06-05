import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import {useShow} from "@/app/hooks/useShow";
import {Grid} from "@nextui-org/react";
import {Box} from "@/app/components/box";
import {TitleSection} from "@/app/components/titleSection";
import ShowMoreOrLess from "@/app/components/showMoreOrLess";
import React from "react";
import {useTranslations} from "use-intl";
import CardImageLink from "@/app/components/cardImageLink";

export default function FansAlsoLike({artists}: {
    artists: ArtistObjectFull[]
}) {
    const artistTranslations = useTranslations('Artist');
    const commonTranslations = useTranslations("Common");
    const {showMore, toggleShowMore} = useShow();

    const renderAlbums = () => {
        if (!artists.length) {
            return null;
        }

        return artists.slice(0, showMore ? artists.length : 6).map((artist, index) => {
            return (
                <Grid key={`artist--${index}`} xs={6} sm={3} md={2}>
                    <CardImageLink
                        img={artist.images[0].url}
                        url={`../artist/${artist.id}`}
                        name={artist.name}
                        type={commonTranslations(`types.${artist.type}`)}
                        roundImg
                    />
                </Grid>
            )
        });
    }

    return <Box>
        <TitleSection title={artistTranslations('fansAlsoLike')}/>
        <Grid.Container gap={2}>
            {renderAlbums()}
        </Grid.Container>
        {artists.length > 6 && <ShowMoreOrLess
            show={showMore}
            callback={toggleShowMore}
        />}
    </Box>
}

