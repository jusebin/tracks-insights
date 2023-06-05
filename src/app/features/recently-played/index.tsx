'use client';

import {useTranslations} from "use-intl";
import {useRecentlyPlayed} from "@/app/hooks/useRecentlyPlayed";
import React from "react";
import {TitleSection} from "../../components/title-section";
import TracksHistory from "@/app/components/tracks-history";

export function RecentlyPlayed() {
    const translationsTitles = useTranslations('TitlesH2');

    const {recentlyPlayed} = useRecentlyPlayed();

    return (
        <section>
            <TitleSection title={translationsTitles('recentlyPlayed')}/>
            <TracksHistory itemsHistory={recentlyPlayed?.items || []} />
        </section>
    );
}
