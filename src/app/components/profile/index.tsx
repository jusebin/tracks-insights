import {Avatar, Button, Col, Row, Text} from "@nextui-org/react";
import {signOut} from "next-auth/react";
import React from "react";
import {useProfile} from "@/app/hooks/useProfile";

export default function Profile() {
    const {profile} = useProfile();

    console.log(profile);

    if (!profile) {
        return null;
    }

    return (
        <div>
            <Row align={"center"} justify={'space-between'}>
                <Col>
                    <Row align={"center"}>
                        <Col css={{width: '64px'}}>
                            <Avatar
                                size={"xl"}
                                src={profile.images.length ? profile.images[0].url : undefined}
                                text={profile.images.length ? undefined : (profile.email).charAt(0).toUpperCase()}
                                color="secondary"
                                bordered
                            />
                        </Col>
                        <Col offset={1}>
                            <Text>{profile.display_name ? profile.display_name : profile.id}</Text>
                            <Text>{profile.email}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row justify={"flex-end"}>
                        <Button
                            size={"lg"}
                            color={"error"}
                            shadow
                            onClick={() => {
                                signOut();
                            }}
                        >Sign out</Button>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
