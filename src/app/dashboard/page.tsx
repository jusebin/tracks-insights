'use client';
import {useSession} from "next-auth/react";
import {UserData} from "@/app/components/user-data";

export default function Dashboard() {
    return (
        <UserData />
    );
}
