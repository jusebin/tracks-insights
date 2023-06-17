import GridArray from "@/app/components/grid-array";
import {Spacer} from "@nextui-org/react";
import {Genres} from "@/app/components/genres";
import React, {useState} from "react";
import {HandleTimeRange} from "@/app/components/handle-time-range";
import {Box} from "@/app/components/box";
import {useTranslations} from "use-intl";
import useSWR from "swr";
import {fetchTopItems} from "@/app/libs/fetch-top-items";
import {useSession} from "next-auth/react";
import {TimeRange, timeRanges} from "@/app/constants/time-ranges";

export default function TopTracksArtistsGenre() {
    const dashboardTranslations = useTranslations("Dashboard");
    const spacerOffset = 2;

    // Main state
    const [usedTimeRange, setUsedTimeRange] = useState<TimeRange>(timeRanges[1]);

    // Custom hooks
    const {data: session} = useSession();

    const {data: topTracks} = useSWR(session ? ['/api/spotify/get-top-tracks', {
        timeRange: usedTimeRange.value,
        type: "tracks",
        access_token: session.access_token
    }] : null, fetchTopItems, {suspense: true});

    const {data: topArtists} = useSWR(session ? ['/api/spotify/get-top-artists', {
        timeRange: usedTimeRange.value,
        type: "artists",
        access_token: session.access_token
    }] : null, fetchTopItems, {suspense: true});

    return (
        <Box>
            <GridArray
                title={dashboardTranslations('titles.topTracks')}
                items={topTracks}
                limit={6}
                ranking
            />
            <Spacer y={spacerOffset}/>

            <GridArray
                title={dashboardTranslations('titles.topArtists')}
                items={topArtists || []}
                limit={6}
                ranking
            />
            <Spacer y={spacerOffset}/>

            <Genres artists={topArtists || []} timeRange={usedTimeRange}/>
            <Spacer y={spacerOffset}/>
            <HandleTimeRange usedTimeRange={usedTimeRange} handleCta={setUsedTimeRange}/>
        </Box>
    )
}
