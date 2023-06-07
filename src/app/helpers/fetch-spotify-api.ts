/**
 *
 * @param endpoint - the pathname endpoint for Spotify
 * @param method - the type of the method (for now only GET or POST)
 * @param token - the access_token given by the Spotify API
 * @param body - the request body
 * @return Promise - a promise with an object inside (or an error).
 */
export async function fetchSpotifyApi(
    endpoint: string,
    method: 'GET' | 'POST',
    token: string,
    body: Object = {}
): Promise<any> {
    const options: RequestInit = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method,
    }

    if (method === 'POST') {
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_URL}${endpoint}`, options);
        return await res.json();
    } catch (error) {
        console.log('Error:', error);
        return error;
    }
}
