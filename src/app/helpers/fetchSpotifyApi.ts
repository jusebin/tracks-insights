export async function fetchSpotifyApi(endpoint, method, token, body = {}) {
    const options: any = {
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
