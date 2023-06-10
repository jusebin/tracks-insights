'use client';

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import React from "react";

// Components
import UserData from "@/app/features/user-data";
import ClassicLayout from "@/app/layouts/classic-layout";

// Custom hooks
import useProfile from "@/app/hooks/use-profile";

export default function Dashboard() {
    const {status} = useSession();
    const {profile} = useProfile();

    if (status === 'unauthenticated') {
        return redirect('/');
    }

    if (!profile) {
        return null;
    }

    return (
        <ClassicLayout
            type={profile.type}
            name={profile.display_name ? profile.display_name : profile.id}
            imgSrc={profile.images ? profile.images[0].url : undefined}
            url={profile.external_urls.spotify}
        >
            <UserData />
        </ClassicLayout>
    )
}
