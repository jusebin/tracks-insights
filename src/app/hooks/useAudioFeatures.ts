import {useEffect, useMemo, useState} from "react";
import AudioFeaturesObject = SpotifyApi.AudioFeaturesObject;
import {useSession} from "next-auth/react";
import MultipleAudioFeaturesResponse = SpotifyApi.MultipleAudioFeaturesResponse;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {useRouter} from "next/router";

export function useAudioFeatures(tracks: TrackObjectFull[]) {
    const {data: session} = useSession();
    const [audioFeaturesLoading, setAudioFeaturesLoading] = useState<boolean>(false);
    const [audioFeatures, setAudioFeatures] = useState<AudioFeaturesObject[]>([]);

    useEffect(() => {
        if (!!session && tracks.length) {
            const ids = tracks.map((track) => track.id);
            const getData = async (): Promise<MultipleAudioFeaturesResponse> => {
                return await (await fetch('/api/spotify/get-audio-features', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        ids
                    })
                })).json();
            }

            if (!audioFeatures.length) {
                setAudioFeaturesLoading(true);
            }

            if (audioFeaturesLoading) {
                (async () => {
                    const data = await getData();
                    setAudioFeaturesLoading(false);
                    setAudioFeatures(data.audio_features);
                })();
            }
        }
    }, [session, audioFeaturesLoading, audioFeatures, tracks])

    return {audioFeatures, setAudioFeaturesLoading}
}
