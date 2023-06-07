import React from "react";
import {Grid, Spacer} from "@nextui-org/react";
import {TitleSection} from "../../components/title-section";
import {useTranslations} from "use-intl";
import {useAudioFeatures} from "@/app/hooks/use-audio-features";
import ProgressValue from "@/app/components/progress-value";
import CardValueTitle from "@/app/components/card-value-title";
import {convertNumberToPitchClass} from "@/app/helpers/convert-number-to-pitch-class";

export function AudioScore({id}: {
    id: string
}) {
    const titleT = useTranslations("TitlesH2");
    const audioT = useTranslations('AudioFeatures');

    const {audioFeatures} = useAudioFeatures(id);

    const getModeTranslation = () => {
        if (!audioFeatures) {
            return undefined
        }

        if (audioFeatures.mode === 0) {
            audioT('mode.minor');
        }

        return audioT('mode.major');
    }


    return (
        <section>
            <TitleSection title={titleT('audioFeatures')}/>
            <Grid.Container gap={2}>
                <Grid xs={6}>
                    <ProgressValue
                        title={audioT("titles.acousticness")}
                        min={0}
                        max={1}
                        value={audioFeatures?.acousticness}
                    />
                </Grid>
                <Grid xs={6}>
                    <ProgressValue
                        title={audioT("titles.danceability")}
                        min={0}
                        max={1}
                        value={audioFeatures?.danceability}
                    />
                </Grid>
                <Grid xs={6}>
                    <ProgressValue
                        title={audioT("titles.energy")}
                        min={0}
                        max={1}
                        value={audioFeatures?.energy}
                    />
                </Grid>
                <Grid xs={6}>
                    <ProgressValue
                        title={audioT("titles.instrumentalness")}
                        min={0}
                        max={1}
                        value={audioFeatures?.instrumentalness}
                    />
                </Grid>
                <Grid xs={6}>
                    <ProgressValue
                        title={audioT("titles.liveness")}
                        min={0}
                        max={1}
                        value={audioFeatures?.liveness}
                    />
                </Grid>
                <Grid xs={6}>
                    <ProgressValue
                        title={audioT("titles.loudness")}
                        min={-60}
                        max={0}
                        value={audioFeatures?.loudness}
                    />
                </Grid>
                <Grid xs={6}>
                    <ProgressValue
                        title={audioT("titles.speechiness")}
                        min={0}
                        max={1}
                        value={audioFeatures?.speechiness}
                    />
                </Grid>
                <Grid xs={6}>
                    <ProgressValue
                        title={audioT("titles.valence")}
                        min={0}
                        max={1}
                        value={audioFeatures?.valence}
                    />
                </Grid>
            </Grid.Container>
            <Spacer y={3}/>
            <Grid.Container gap={2}>
                <Grid xs={4}>
                    <CardValueTitle
                        value={audioFeatures?.loudness.toFixed(1)}
                        title={audioT("titles.loudness")}
                    />
                </Grid>

                <Grid xs={4}>
                    <CardValueTitle
                        value={convertNumberToPitchClass(audioFeatures?.key)}
                        title={audioT("titles.key")}
                    />
                </Grid>

                <Grid xs={4}>
                    <CardValueTitle
                        value={getModeTranslation()}
                        title={audioT("titles.mode")}
                    />
                </Grid>

                <Grid xs={4}>
                    <CardValueTitle
                        value={audioFeatures ? `${audioFeatures.time_signature}/4` : '-'}
                        title={audioT("titles.timeSignature")}
                    />
                </Grid>

                <Grid xs={4}>
                    <CardValueTitle
                        value={audioFeatures?.tempo.toFixed(1)}
                        title={audioT("titles.tempo")}
                    />
                </Grid>
            </Grid.Container>
        </section>
    )
}
