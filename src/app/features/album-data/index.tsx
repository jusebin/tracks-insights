import Header from "@/app/components/header/header";
import React, {Suspense, useMemo} from "react";
import {useFormatter, useTranslations} from "use-intl";
import useAlbum from "@/app/hooks/use-album";
import useAlbumTracks from "@/app/hooks/use-album-tracks";
import useArtists from "@/app/hooks/use-artists";
import {Row, Spacer} from "@nextui-org/react";
import {getTracksDuration} from "@/app/helpers/get-tracks-duration";
import ColValueTitle from "@/app/components/col-value-title";
import TitleSection from "@/app/components/title-section";
import GridArray from "@/app/components/grid-array";
import TableTracks from "@/app/components/table-tracks";
import CustomContainer from "@/app/components/custom-container";
import useSWR from "swr";
import {useSession} from "next-auth/react";
import {fetchAlbum} from "@/app/libs/fetchAlbum";
import {fetchAlbumTracks} from "@/app/libs/fetchAlbumTracks";
import {fetchArtists} from "@/app/libs/fetchArtists";
import HeaderLayout from "@/app/features/header-layout";

export default function AlbumData({id}: {
    id: string
}) {
    const commonTranslations = useTranslations("Common");
    const titlesTranslations = useTranslations("TitlesH2");
    const albumTranslations = useTranslations('Album');
    const format = useFormatter();
    const {data: session} = useSession();

    const {data: album} = useSWR(session ? {
        id,
        access_token: session.access_token
    } : null, fetchAlbum, {suspense: true});

    // console.log(album);

    const {data: albumTracks} = useSWR(album && session ? {
        id,
        tracksLength: album.total_tracks,
        access_token: session.access_token
    } : null, fetchAlbumTracks, {suspense: true});

    const artistsIds: string[] = useMemo(() => {
        if (!album) {
            return []
        }

        return album.artists.map((artist) => artist.id);

    }, [album]);

    const {data: artists} = useSWR(artistsIds.length && session ? {
        ids: artistsIds,
        access_token: session.access_token
    } : null, fetchArtists, {suspense: true});

    return (
        <>
            <HeaderLayout
                type={'album'}
                name={album.name}
                url={album?.external_urls.spotify}
                imgSrc={album.images[1].url}
            />

            <CustomContainer>
                <Row>
                    <ColValueTitle value={`${album?.popularity} / 100`} label={albumTranslations('popularity')}/>
                    <ColValueTitle value={format.dateTime(new Date(album?.release_date || 0), {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    })} label={albumTranslations('releaseDate')}/>
                    <ColValueTitle value={albumTracks ? albumTracks.length : 0} label={albumTranslations('tracks')}/>
                    <ColValueTitle value={getTracksDuration(albumTracks || [])} label={albumTranslations('duration')}/>
                </Row>
                <Spacer y={2}/>

                <GridArray
                    title={commonTranslations('titles.artists')}
                    items={artists || []}
                    limit={6}
                />
                <Spacer y={2}/>

                <TitleSection title={titlesTranslations("albumContent")}/>
                {!!albumTracks && <TableTracks tracks={albumTracks}/>}
            </CustomContainer>
        </>

    )
}
