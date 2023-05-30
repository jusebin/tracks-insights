'use client';
import {useSession} from "next-auth/react";
import {UserData} from "@/app/components/user-data";
import {redirect} from "next/navigation";

export default function Dashboard({params: locale}) {
    const {data: session} = useSession();
    console.log('coucou locale', locale);

    // if (!session) {
    //     return redirect('/');
    // }

    return (
        // <div>Dashboard</div>
        <UserData />
    );
}
