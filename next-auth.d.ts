import "next-auth/jwt"
import "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
    interface JWT {
        /** The user's role. */
        userRole?: "admin";
        access_token?: string;
        expires_at?: number;
        refresh_token?: string;
    }
}

declare module "next-auth" {
    interface Account {
        /** The user's role. */
        userRole?: "admin";
        access_token?: string;
        expires_at?: number;
        refresh_token?: string;
    }

    interface Session {
        access_token?: string;
        expires_at?: number;
        refresh_token?: string;
    }
}
