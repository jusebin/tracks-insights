'use client';
import {useSession} from "next-auth/react";
import {UserData} from "@/app/components/user-data";
import {redirect} from "next/navigation";
import {ClassicLayout} from "@/app/components/classicLayout";

export default function Dashboard() {
    const {status} = useSession();

    if (status === 'unauthenticated') {
        return redirect('/');
    }

    return (
        <ClassicLayout>
            <UserData />
        </ClassicLayout>
    );
}
