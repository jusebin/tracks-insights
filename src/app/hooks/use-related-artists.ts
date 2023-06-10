import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {useProfile} from "@/app/hooks/use-profile";

export default function useRelatedArtists(id: string) {
    const {data: session} = useSession();
    const {profile} = useProfile();
    const [relatedArtists, setRelatedArtists] = useState<ArtistObjectFull[]>([]);

    useEffect(() => {
        if (!!session && !!profile) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-related-artists', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        country: profile.country,
                        id
                    })
                })).json();
            }

            if (!relatedArtists.length) {
                (async () => {
                    const data = await getData();
                    setRelatedArtists(data.artists);
                })();
            }
        }
    }, [session, relatedArtists, id, profile]);

    return {relatedArtists}
}
