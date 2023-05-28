import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

export function useProfile() {
    const [profile, setProfile] = useState(undefined);
    const {data: session} = useSession();

    useEffect(() => {
        if (!profile) {
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
    }, [profile, session.access_token])

    return {profile};
}
