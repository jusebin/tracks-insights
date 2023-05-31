import AudioFeaturesObject = SpotifyApi.AudioFeaturesObject;

export type property = 'acousticness' | 'danceability' | 'energy' | 'instrumentalness' | 'key'
| 'liveness' | 'loudness' | 'speechiness' | 'tempo' | 'time_signature' | 'valence';

export function getAudioScore(property: property, audioFeatures: AudioFeaturesObject[]): number {
    let score = 0;

    for (const feature of audioFeatures) {
        score += feature[property];
    }

    return score / audioFeatures.length
}
