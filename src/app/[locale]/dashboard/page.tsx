'use client';
import {useSession} from "next-auth/react";
import {UserData} from "@/app/components/user-data";
import {redirect} from "next/navigation";

export default function Dashboard({params: locale}) {
    const {status} = useSession();

    if (status === 'unauthenticated') {
        return redirect('/');
    }

    return (
        <UserData />
    );
}
