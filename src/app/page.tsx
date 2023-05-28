'use client';

import {Button, Container, Row, Text} from "@nextui-org/react";
import {useSession, signIn, signOut} from "next-auth/react";
import {useCallback} from "react";
import {UserData} from "@/app/components/user-data";

export default function Home() {
    const {data: session} = useSession();

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
            <Container direction={"column"} alignItems={"center"} justify={"center"} fluid>
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
