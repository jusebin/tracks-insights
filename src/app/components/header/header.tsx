import {Link, Navbar, Text, Button} from "@nextui-org/react";
import React from "react";
import {signOut} from "next-auth/react";
import {useTranslations} from "use-intl";

export default function Header() {
    const styleGradient = {
        textGradient: "45deg, $purple600 -20%, $pink600 50%, $yellow600 70%, $red600 100%"
    };

    const buttonsTranslation = useTranslations("Buttons");

    return (
        <Navbar variant={"floating"} css={{zIndex: 999, w: "100vw"}}>
            <Navbar.Brand>
                <Text h1 size="$4xl" css={styleGradient}><Link href={"/dashboard"}>Tracks Insights</Link></Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Item>
                    <Button
                        size={"xs"}
                        color={"error"}
                        bordered
                        onPress={() => signOut()}
                    >{buttonsTranslation('logOut')}</Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}
