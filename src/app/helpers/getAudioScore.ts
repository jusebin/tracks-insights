import AudioFeaturesObject = SpotifyApi.AudioFeaturesObject;

export function getAudioScore(property: string, audioFeatures: AudioFeaturesObject[]): number {
    let score = 0;

    for (const feature of audioFeatures) {
        score += feature[property];
    }

    return score / audioFeatures.length
}
