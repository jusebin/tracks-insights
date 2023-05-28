import React from "react";
import {Button, Card, Col, Container, Row, Spacer, Text} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react";
import {useSongs} from "@/app/hooks/useSongs";
import {Artists} from "@/app/components/artists";
import {Songs} from "@/app/components/songs";
import Profile from "@/app/components/profile";

export function UserData() {
    const limitTopItems = 5;

    return (<div>
        <div>
            <Profile />
        </div>
        <Container>
            <Row gap={1}>
                <Col span={6}>
                    <Songs limit={limitTopItems} />
                </Col>
                <Col span={6}>
                    <Artists limit={limitTopItems} />
                </Col>
            </Row>
        </Container>
    </div>);
}
