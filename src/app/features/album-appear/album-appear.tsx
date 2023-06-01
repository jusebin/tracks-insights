import {useAlbum} from "@/app/hooks/useAlbum";
import {TitleSection} from "@/app/components/titleSection";
import {useTranslations} from "use-intl";
import {Box} from "@/app/components/box";
import {Image, Link, Text} from "@nextui-org/react";
import React from "react";

export default function AlbumAppear({id}: {
    id: string
}) {
    const songTranslation = useTranslations("Song");
    const {album} = useAlbum(id);

    if (!album) {
        return null;
    }

    return (
        <>
            <TitleSection title={songTranslation('appearsOn')}/>
            <Box>
                <Link href={`../album/${album.id}`} css={{d: "inline-block"}}>
                    <Image src={album.images[0].url} width={160} alt={`cover album ${album.name}`}/>
                    <Text weight={"bold"} size={"xl"}>{album.name}</Text>
                </Link>
            </Box>
        </>
    )
};
