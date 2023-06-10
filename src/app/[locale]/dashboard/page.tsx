'use client';

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import React, {Suspense} from "react";

// Components
import UserData from "@/app/features/user-data";
import ClassicLayout from "@/app/layouts/classic-layout";

// Custom hooks
import useProfile from "@/app/hooks/use-profile";
import Header from "@/app/components/header/header";

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
        <>
            <Header/>
            <Suspense fallback={<div>coucou</div>}>
                <UserData/>
            </Suspense>
        </>

    )
}
