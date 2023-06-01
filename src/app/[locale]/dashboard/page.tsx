'use client';
import {useSession} from "next-auth/react";
import {UserData} from "@/app/components/user-data";
import {redirect} from "next/navigation";
import {DashboardLayout} from "@/app/layouts/dashboard-layout";

export default function Dashboard() {
    const {status} = useSession();

    if (status === 'unauthenticated') {
        return redirect('/');
    }

    return (
        <DashboardLayout>
            <UserData />
        </DashboardLayout>
    );
}
