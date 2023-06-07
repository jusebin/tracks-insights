import NextAuth, {Account, Session, TokenSet} from "next-auth";
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
            if (account) {
                return {
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
                    refresh_token: token.refresh_token || ''
                });

                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_SPOTIFY_TOKEN || '', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Basic ${(Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'))}`
                        },
                        body: params,
                    });

                    const tokens: TokenSet = await response.json();

                    return {
                        ...token,
                        access_token: tokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in)
                    }

                } catch(error) {
                    console.log('Error refreshing access token', error);
                    return {...token, error: "RefreshAccessTokenError" as const};
                }
            }
        },
        async session({session, token}: {
            session: Session,
            token: JWT
        }) {
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
