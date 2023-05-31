'use client';

import React from "react";
import {Navbar, Text, Switch, useTheme} from "@nextui-org/react";
import {useTheme as useNextTheme} from 'next-themes'
import {SvgIcon} from "@/app/components/svgIcon";

export function ClassicLayout({children}: {
    children: React.ReactNode
}) {
    const styleGradient = {
        textGradient: "45deg, $purple600 -20%, $pink600 50%, $yellow600 70%, $red600 100%"
    };

    const {isDark} = useTheme();
    const nextTheme = useNextTheme();

    return (
        <>
            <Navbar variant={"sticky"}>
                <Navbar.Brand>
                    <Text h1 size="$4xl" css={styleGradient}>Tracks Insights</Text>
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
            <div>
                {children}
            </div>
        </>
    )
}
