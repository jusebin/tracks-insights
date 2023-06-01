'use client';

import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import ClassicLayout from "@/app/layouts/classic-layout";
import {useAlbum} from "@/app/hooks/useAlbum";

export default function Album({params: {id}}: {
    params: Params
}) {
    const {album} = useAlbum(id);

    console.log(album);

    if (!album) {
        return null;
    }

    return (
        <ClassicLayout
            type={"album"}
            name={album.name}
            imgSrc={album.images[0].url}
            url={album.external_urls.spotify}
        >
            <div>coucou</div>
        </ClassicLayout>
    );
}
