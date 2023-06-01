import {useTranslations} from "use-intl";
import {useRecentlyPlayed} from "@/app/hooks/useRecentlyPlayed";
import {calcDate} from "@/app/helpers/calcDate";
import React from "react";
import {Col, Image, Link, Row, Spacer, Text} from "@nextui-org/react";
import {TrackNameAndArtists} from "@/app/components/trackNameAndArtists";
import {TitleSection} from "@/app/components/titleSection";
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import TracksHistory from "@/app/components/tracks-history";

export function RecentlyPlayed(
    {
        timeValue,
        label,
        limit = 30,
        showLinkToPage,
        autoLoadOnBottom
    }: {
        timeValue: number;
        label: 'before' | 'after',
        limit?: number,
        showLinkToPage?: boolean,
        autoLoadOnBottom?: boolean
    }) {
    const translationsTitles = useTranslations('TitlesH2');
    const translations = useTranslations("RecentlyPlayed");

    const {recentlyPlayed} = useRecentlyPlayed(limit, timeValue, label);

    return (
        <section>
            <TitleSection title={translationsTitles('recentlyPlayed')}/>
            <TracksHistory itemsHistory={recentlyPlayed?.items || []} />
            {showLinkToPage && <Link href={"recently-played"}>
                <Text size={"$lg"}>{translations("seeMore")}</Text>
            </Link>}
        </section>
    );
}
