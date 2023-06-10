import UserObjectPrivate = SpotifyApi.UserObjectPrivate;

export const fetchProfile = async ({access_token}: {
    access_token: string
}): Promise<UserObjectPrivate> => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            access_token
        })
    };

    return await (await fetch('/api/spotify/get-profile', options)).json();
}
