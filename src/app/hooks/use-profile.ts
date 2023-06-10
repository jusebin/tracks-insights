'use client';

import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;

export default function useProfile() {
    const [profile, setProfile] = useState<UserObjectPrivate | undefined>(undefined);
    const {data: session} = useSession();

    useEffect(() => {
        if (!profile && !!session) {
            (async () => {
                const data =  await (await fetch('/api/spotify/get-profile', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                    })
                })).json();

                setProfile(data);
            })();
        }
    }, [profile, session])

    return {profile};
}
