'use client';

import {Button, Loading, Row, Text} from "@nextui-org/react";
import {useSession, signIn} from "next-auth/react";
import {useTranslations} from "use-intl";
import {redirect} from "next/navigation";
import React from "react";
import HomeLayout from "@/app/layouts/home-layout";
import {PLAYLISTS} from "@/app/constants/playlists";
import useSWR from "swr";
import {fetchPlaylist} from "@/app/libs/fetch-playlist";

export default function Home({params: {locale}}: {
    params: {locale: string}
}) {
    const {status} = useSession();
    const t = useTranslations('Buttons');
    const catchphraseTranslations = useTranslations("Common");
    const playlist = PLAYLISTS.find((playlist) => playlist.code === locale);

    const {data: playlistData} = useSWR({
        playlistId: playlist?.id
    }, fetchPlaylist);

    if (status === 'authenticated') {
        redirect('/dashboard');
    }

    const render = () => {
        if (['loading', 'authenticated'].includes(status)) {
            return <Loading size={"xl"} />
        }

        return <>
            <Row justify={"center"}>
                <Text
                    h1
                    css={{textAlign: 'center', fontSize: "10vw"}}
                    weight={"black"}
                >Tracks Insights</Text>
            </Row>
            <Row justify={"center"}>
                <Text
                    h2
                    css={{textAlign: 'center', maxWidth: "670px"}}
                    weight={"black"}
                >{catchphraseTranslations('titles.catchphrase')}</Text>
            </Row>
            <Row justify={"center"}>
                <Button
                    size={"lg"}
                    color={"gradient"}
                    shadow
                    onPress={() => {
                        signIn('spotify');
                    }}
                >{t('signIn')}</Button>
            </Row>
        </>
    }

    return (
        <HomeLayout>
            {render()}
        </HomeLayout>
    );
}
