import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import AudioFeaturesResponse = SpotifyApi.AudioFeaturesResponse;

export function useAudioFeatures(id: string) {
    const {data: session} = useSession();
    const [audioFeatures, setAudioFeatures] = useState<AudioFeaturesResponse | undefined>(undefined);

    useEffect(() => {
        if (!!session && id) {
            const getData = async (): Promise<AudioFeaturesResponse> => {
                return await (await fetch('/api/spotify/get-audio-features', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        id
                    })
                })).json();
            }

            if (!audioFeatures) {
                (async () => {
                    const data = await getData();
                    setAudioFeatures(data);
                })();
            }
        }
    }, [session, audioFeatures, id])

    return {audioFeatures}
}
