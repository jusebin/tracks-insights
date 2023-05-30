import {Avatar, Button, Col, Row, Text} from "@nextui-org/react";
import {signOut} from "next-auth/react";
import React from "react";
import {useProfile} from "@/app/hooks/useProfile";
import {useTranslations} from "use-intl";

export default function Profile() {
    const {profile} = useProfile();
    const t = useTranslations("Buttons");

    if (!profile) {
        return null;
    }
    const renderImage = () => {
        if (!profile.images || !profile.images.length) {
            return <Avatar
                size={"xl"}
                text={(profile.email).charAt(0).toUpperCase()}
                color="primary"
                bordered
            />
        }

        return <Avatar
            size={"xl"}
            src={profile.images[0].url}
            color="secondary"
            bordered
        />
    }

    return (
        <div>
            <Row align={"center"} justify={'space-between'} wrap={"wrap"} fluid>
                <Col>
                    <Row align={"center"}>
                        <Col css={{width: '64px', border: "1px solid red"}}>
                            {renderImage()}
                        </Col>
                        <Col css={{border: "1px solid green"}}>
                            <Text css={{
                                pl: "10px"
                            }}>{profile.display_name ? profile.display_name : profile.id}</Text>
                            <Text css={{pl: "10px"}}>{profile.email}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row justify={"flex-end"}>
                        <Button
                            size={"lg"}
                            color={"error"}
                            bordered
                            onPress={() => {
                                signOut();
                            }}
                        >{t('logOut')}</Button>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
