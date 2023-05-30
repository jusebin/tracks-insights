
import AudioFeaturesObject = SpotifyApi.AudioFeaturesObject;
import {useMemo} from "react";
import {getAudioScore} from "@/app/helpers/getAudioScore";

export function AudioScore({audioFeatures}: {
    audioFeatures: AudioFeaturesObject[]
}) {
    const acousticness = getAudioScore('acousticness', audioFeatures);
    const danceability = getAudioScore('danceability', audioFeatures);
    const energy = getAudioScore('energy', audioFeatures);
    const instrumentalness = getAudioScore('instrumentalness', audioFeatures);
    const key = getAudioScore('key', audioFeatures);
    const liveness = getAudioScore('liveness', audioFeatures);
    const loudness = getAudioScore('loudness', audioFeatures);
    const speechiness = getAudioScore('speechiness', audioFeatures);
    const tempo = getAudioScore('tempo', audioFeatures);
    const timeSignature = getAudioScore('time_signature', audioFeatures);
    const valence = getAudioScore('valence', audioFeatures);

    console.table(audioFeatures[0]);
    return (
        <div>coucou {audioFeatures.length}</div>
    )
}
