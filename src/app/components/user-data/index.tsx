'use client';
import React from "react";
import {Container, Spacer} from "@nextui-org/react";
import {Artists} from "@/app/components/artists";
import {Songs} from "@/app/components/songs";
import Profile from "@/app/components/profile";

export function UserData() {
    const limitTopItems = 5;

    return (<Container fluid>
        <div>
            <Profile />
        </div>
        <Spacer y={2} />
        <div>
            <div>
                <Songs limit={limitTopItems} />
            </div>
            <Spacer y={3} />
            <div>
                <Artists limit={limitTopItems} />
            </div>
        </div>
    </Container>)
}
