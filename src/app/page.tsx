'use client';

import {Button, Container, Row, Text} from "@nextui-org/react";
import {useSession, signIn} from "next-auth/react";
import {useCallback} from "react";
import {UserData} from "@/app/components/user-data";

export default function Home() {
    const {data: session} = useSession();
    console.log(session);
    console.log('process env NEXT_PUBLIC_SPOTIFY_CLIENT_ID', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
    console.log('process env NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET);
    console.log('process env NEXT_PUBLIC_SPOTIFY_TOKEN', process.env.NEXT_PUBLIC_SPOTIFY_TOKEN);
    console.log('process env NEXT_PUBLIC_SPOTIFY_URL', process.env.NEXT_PUBLIC_SPOTIFY_URL);

    const styleGradient = {
        textGradient: "45deg, $blue600 -20%, $pink600 50%"
    };

    const render = useCallback(() => {
            if (session) {
                return <UserData />
            }

            return (
                <Button
                    size={"lg"}
                    color={"gradient"}
                    shadow
                    onClick={() => {
                        signIn('spotify');
                    }}
                >Sign in with Spotify</Button>
            );
        },[session],
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
