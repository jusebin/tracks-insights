import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {useProfile} from "@/app/hooks/useProfile";

export function useArtistTopTracks(id: string) {
    const {data: session} = useSession();
    const {profile} = useProfile();
    const [artistTopTracks, setArtistTopTracks] = useState<TrackObjectFull[]>([]);

    useEffect(() => {
        if (!!session && !!profile) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-artist-top-tracks', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        country: profile.country,
                        id
                    })
                })).json();
            }

            if (!artistTopTracks.length) {
                (async () => {
                    const data = await getData();
                    setArtistTopTracks(data.tracks);
                })();
            }
        }
    }, [session, artistTopTracks, id, profile]);

    return {artistTopTracks}
}
