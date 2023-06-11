'use client';

import {useTranslations} from "use-intl";
import {useRecentlyPlayed} from "@/app/hooks/use-recently-played";
import React from "react";
import TitleSection from "../../components/title-section";
import TracksHistory from "@/app/components/tracks-history";
import UsersRecentlyPlayedTracksResponse = SpotifyApi.UsersRecentlyPlayedTracksResponse;

export function RecentlyPlayed({recentlyPlayed}: {
    recentlyPlayed: UsersRecentlyPlayedTracksResponse
}) {
    const translationsTitles = useTranslations('TitlesH2');

    return (
        <section>
            <TitleSection title={translationsTitles('recentlyPlayed')}/>
            <TracksHistory itemsHistory={recentlyPlayed?.items || []} />
        </section>
    );
}
