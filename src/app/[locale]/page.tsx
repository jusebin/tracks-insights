'use client';

import {Button, Container, Row, Text} from "@nextui-org/react";
import {useSession, signIn} from "next-auth/react";
import {useCallback} from "react";
import {redirect} from "next/navigation";
import {useTranslations} from "use-intl";

export default function Home() {
    const {data: session} = useSession();
    const t = useTranslations('Buttons');

    const styleGradient = {
        textGradient: "45deg, $blue600 -20%, $pink600 50%"
    };

    // console.log('session', session);

    const render = useCallback(() => {
            if (session) {
                return redirect('/dashboard');
            }

            return (
                <Button
                    size={"lg"}
                    color={"gradient"}
                    shadow
                    onPress={() => {
                        signIn('spotify');
                    }}
                >{t('signIn')}</Button>
            );
        }, [session],
    );

    return (
        <main>
            <Container
                display={session ? 'block' : 'flex'}
                direction={"column"}
                alignItems={"center"}
                justify={"center"}
                fluid
                css={{height: '100vh'}}
            >
                <Row justify={"center"}>
                    <Text
                        h1
                        css={styleGradient}
                        weight={"bold"}
                    >Data Spotify</Text>
                </Row>
                <Row justify={"center"}>{render()}</Row>
            </Container>
        </main>
    );
}
