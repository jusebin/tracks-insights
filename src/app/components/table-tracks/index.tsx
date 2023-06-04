import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {Link, Row, Table, Text} from "@nextui-org/react";
import React, {Key} from "react";
import {convertMsToMinutes} from "@/app/helpers/convertMsToMinutes";
import {SvgIcon} from "@/app/components/svgIcon";
import {useTranslations} from "use-intl";
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;

interface Row {
    [key: string]: any
}

interface Column {
    key: string;
    label: string;
}

export default function TableTracks({tracks}: {
    tracks: TrackObjectFull[]
}) {
    let cellIndex = 1;
    const albumTranslation = useTranslations("Album");

    const columns: Column[] = [
        {key: "number", label: "#"},
        {key: "name", label: albumTranslation('track')},
        {key: "duration", label: albumTranslation('duration')},
    ];
    const rows: Row[] = [];
    const arrayOfTracksArray: TrackObjectFull[][] = [];


    const maxDisc = Math.max(...tracks.map((track) => track.disc_number));

    for (let i = 1; i <= maxDisc; i++) {
        const temp = tracks.filter((track) => track.disc_number === i);
        arrayOfTracksArray.push(temp);
    }

    arrayOfTracksArray.forEach((tracks, index) => {
        if (maxDisc > 1) {
            rows.push({
                key: String(cellIndex),
                number: '',
                name: albumTranslation('disc', {number: index + 1}),
                duration: '',
                isDisc: true
            });

            cellIndex += 1;
        }

        for (const track of tracks) {
            rows.push({
                key: String(cellIndex),
                number: track.track_number,
                name: track.name,
                duration: convertMsToMinutes(track.duration_ms),
                artists: track.artists
            });

            cellIndex += 1;
        }
    });

    const renderArtists = (artists: ArtistObjectSimplified[], trackName: string) => {
        return artists.map((artist, index) => {
            return (
                <React.Fragment>
                    <Link
                        key={`artist-${artist.id}-${trackName}`}
                        href={`../artist/${artist.id}`}
                        css={{
                            color: "$gray800",
                            fontSize: "$sm"
                        }}
                    >
                        {artist.name}
                    </Link>
                    {index < artists.length - 1 && ", "}
                </React.Fragment>
            )
        });
    }

    const renderCell = (row: Row, columnKey: Key) => {
        const cellValue = row[columnKey];

        switch (columnKey) {
            case "number":
                if (row.isDisc) {
                    return (
                        <Text weight={"bold"} color={"$gray800"} css={{lineHeight: 0, pr: "5px"}}>
                            <SvgIcon width={20} height={20} name={"disc"}/>
                        </Text>
                    );
                }

                return (
                    <Text color={"$gray800"}>
                        {cellValue}
                    </Text>
                );
            case "name":
                if (row.isDisc) {
                    return (
                        <Text weight={"bold"} color={"$gray800"}>
                            {cellValue}
                        </Text>
                    );
                }

                return (
                    <>
                        <Text>{cellValue}</Text>
                        {row.artists && renderArtists(row.artists, cellValue)}
                    </>
                );
            default:
                return (
                    <>
                        <Text>{row.duration}</Text>
                    </>
                );
        }
    }

    return (
        <Table
            aria-label={`Tracks table for the album`}
            headerLined
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column css={{fontSize: "$md"}} key={column.key}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={rows}>
                {(item) => (
                    <Table.Row>
                        {(columnKey) => (
                            <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}
