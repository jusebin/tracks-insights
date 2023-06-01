'use client';
import {useSession} from "next-auth/react";
import {UserData} from "../../features/user-data";
import {redirect} from "next/navigation";
import {DashboardLayout} from "@/app/layouts/dashboard-layout";
import {useProfile} from "@/app/hooks/useProfile";
import ClassicLayout from "@/app/layouts/classic-layout";
import React from "react";

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
            type={"profile"}
            name={profile.display_name ? profile.display_name : profile.id}
            imgSrc={profile.images ? profile.images[0].url : undefined}
            url={profile.external_urls.spotify}
        >
            <UserData />
        </ClassicLayout>
    )
}
