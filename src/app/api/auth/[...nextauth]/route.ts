import NextAuth, {TokenSet} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            authorization:
                'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-top-read',
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            // console.log('hi jwt', token, account)
            if (account) {
                token = {
                    ...token,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at
                }
            }
            else if (Date.now() < token.expires_at * 1000) {
                return token;
            }
            else {
                const params = new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: token.refresh_token
                });

                try {
                    fetch(process.env.NEXT_PUBLIC_SPOTIFY_TOKEN, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Basic ${(new Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'))}`
                        },
                        body: params,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('token data new', data);
                            return {
                                ...token,
                                access_token: data.access_token,
                                expires_at: (Date.now / 1000) + data.expires_in
                            };
                        });

                } catch(error) {
                    console.log('Error refreshing access token', error);
                    return {...token, error: "RefreshAccessTokenError" as const};
                }
            }

            return token;
        },
        async session({session, token}) {
            // console.log('hi session')
            // console.log('TOKEN DATA IN SESSION', token);
            session = {
                ...session,
                access_token: token.access_token,
                expires_at: token.expires_at,
                refresh_token: token.refresh_token
            }

            return session;
        }
    }
});

declare module "@auth/core/types" {
    interface Session {
        error?: "RefreshAccessTokenError"
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        access_token: string
        expires_at: number
        refresh_token: string
        error?: "RefreshAccessTokenError"
    }
}

export {handler as GET, handler as POST}
