import NextAuth, {Account, Session} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import {JWT} from "next-auth/jwt";


export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    providers: [
        SpotifyProvider({
            authorization:
                `https://accounts.spotify.com/authorize?scope=
                user-read-email,
                user-read-private,
                user-top-read,
                user-read-playback-state,
                user-read-recently-played,
                user-read-currently-playing
                `,
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async jwt({token, account}: {token: JWT, account: Account |null}) {
            console.log('hi jwt', account)
            if (account) {
                token = {
                    ...token,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at
                }
            }
            // @ts-ignore
            else if (Date.now() < token["expires_at"] * 1000) {
                return token;
            }
            else {
                console.log('coucou');
                const params = new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: token.refresh_token || ''
                });
                //
                try {
                    fetch(process.env.NEXT_PUBLIC_SPOTIFY_TOKEN || '', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Basic ${(Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'))}`
                        },
                        body: params,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            const dateNow = Number(Date.now());
                            return {
                                ...token,
                                access_token: data.access_token,
                                expires_at: dateNow + data.expires_in
                            };
                        });

                } catch(error) {
                    console.log('Error refreshing access token', error);
                    return {...token, error: "RefreshAccessTokenError" as const};
                }
            }

            return token;
        },
        async session({session, token}: {
            session: Session,
            token: JWT
        }) {
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
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
