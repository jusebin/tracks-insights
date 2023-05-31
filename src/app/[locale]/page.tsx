'use client';

import {Button, Loading, Row, Text} from "@nextui-org/react";
import {useSession, signIn} from "next-auth/react";
import {useTranslations} from "use-intl";
import {redirect} from "next/navigation";
import {HomeLayout} from "@/app/components/homeLayout";

export default function Home() {
    const {status} = useSession();
    const t = useTranslations('Buttons');

    const styleGradient = {
        textGradient: "45deg, $purple600 -20%, $pink600 50%, $yellow600 70%, $red600 100%"
    };

    if (status === 'authenticated') {
        redirect('/dashboard');
    }

    const render = () => {
        if (['loading', 'authenticated'].includes(status)) {
            return <Loading size={"xl"} />
        }

        return <>
            <Row justify={"center"}>
                <Text
                    h1
                    css={styleGradient}
                    weight={"black"}
                >Tracks Insights</Text>
            </Row>
            <Row justify={"center"}>
                <Button
                    size={"lg"}
                    color={"gradient"}
                    shadow
                    onPress={() => {
                        signIn('spotify');
                    }}
                >{t('signIn')}</Button>
            </Row>
        </>
    }

    return (
        <HomeLayout>
            {render()}
        </HomeLayout>
    );
}
