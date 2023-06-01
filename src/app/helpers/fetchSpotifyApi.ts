export async function fetchSpotifyApi(
    endpoint: string,
    method: 'GET' | 'POST',
    token: string,
    body: Object = {}
) {
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
