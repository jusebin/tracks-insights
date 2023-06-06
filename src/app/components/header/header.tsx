import {Link, Navbar, Switch, Text, useTheme} from "@nextui-org/react";
import {SvgIcon} from "@/app/components/svgIcon";
import React from "react";
import {useTheme as useNextTheme} from "next-themes";

export default function Header() {
    const styleGradient = {
        textGradient: "45deg, $purple600 -20%, $pink600 50%, $yellow600 70%, $red600 100%"
    };

    const {isDark} = useTheme();
    const nextTheme = useNextTheme();

    return (
        <Navbar variant={"floating"} css={{zIndex: 999, w: "100vw"}}>
            <Navbar.Brand>
                <Text h1 size="$4xl" css={styleGradient}><Link href={"/dashboard"}>Tracks Insights</Link></Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Item>
                    <Switch
                        checked={isDark}
                        iconOn={<SvgIcon name={"moon"} />}
                        iconOff={<SvgIcon name={"sun"} />}
                        size={"xl"}
                        onChange={(e) => nextTheme.setTheme(e.target.checked ? 'dark' : 'light')}
                    />
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}
