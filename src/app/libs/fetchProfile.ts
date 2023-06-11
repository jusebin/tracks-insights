import UserObjectPrivate = SpotifyApi.UserObjectPrivate;

export const fetchProfile = async (array: [number, {access_token: string}]): Promise<UserObjectPrivate> => {
    const {access_token} = array[1];
    const options = {
        method: "POST",
        body: JSON.stringify({
            access_token
        })
    };

    return await (await fetch('/api/spotify/get-profile', options)).json();
}
