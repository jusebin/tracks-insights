# Tracks Insights
[![stability-wip](https://img.shields.io/badge/stability-wip-lightgrey.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#work-in-progress)

![Screen of the desktop version](./screen-desktop.png)

This project showcases a Spotify user's data regarding their activity on the application. It also displays specific data regarding the tracks, albums, and artists followed by the user, leveraging the Spotify Web API.

It builds thanks to [Vercel](https://www.vercel.com/) which analyze each commit on the `main` branch of this project to make another build on production.

As this app is still in development mode from Spotify (see more in [quotas mode Spotify section](https://developer.spotify.com/documentation/web-api/concepts/quota-modes)), 
the best way to show this is to fork the project and use your own client and secrets keys


**Beware**, this app is still in **WIP**, the code could change at every time.

## Main dependencies
> Usefull docs to read to understand this project

[Typescript documentation](https://www.typescriptlang.org/) - strongly typed programming language

[NextJS documentation](https://nextjs.org/) - React framework that gives you building blocks to create web applications

[React documentation](https://react.dev/) - JS framework that lets you build user interfaces out of individual pieces called components

[NextAuth documentation](https://next-auth.js.org/) - A complete open-source authentication solution for Next.js applications

[Next-intl documentation](https://next-intl-docs.vercel.app/) - I18N node package

[NextUI documentation](https://nextui.org/) - Node package which allows you to create modern and beautiful components 

[Spotify Web API documentation](https://developer.spotify.com/documentation/web-api) - Enables the creation of applications that can interact with Spotify's streaming service

## Tasks list
If you want to know what I did and what I'm developing next
- [x] Make API calls
- [x] Create custom hooks which call API
- [x] Integrate Dashboard, Artist, Track, and Album pages
- [ ] Create new version of the `Header` component
- [ ] Desactivate theme swapping and force it to dark theme
- [ ] Create a `Skeleton`component while the data are loading
- [ ] Integrate the landing page
- [ ] Submit the app to Spotify validation to remove the [quotas modes](https://developer.spotify.com/documentation/web-api/concepts/quota-modes)
- [ ] Document all the files

## Main architecture
 
    ├── src                    # Source files
         ├── messages          # The json files for translations
         ├── app               # The core folder of Next (version 13 and above)
              ├── [locale]     # The Next pages architecture (to make urls)
              ├── api          # Api directory for intern and extern api calls
              ├── components   # Small components reusable through React files
              ├── constants    # Contansts files
              ├── features     # Components only used for a certain url (or page in the Next context)
              ├── helpers      # Usefull functions can be used in any Typescript file
              ├── hooks        # Custom React hooks which call API and return data (reusable in any component)
              ├── layouts      # Layout React components usable in pages 
              ├── providers    # Provider React components to use differents contexts
    ├── package.json           # Do I really need to explain :D ?
    ├── tsconfig.json          # The typescript config file
    ├── next.config.js         # Next config file (here I expose env variables)
    └── README.md              # This file


## Getting Started

### First
After installing dependencies with a `yarn` or `npm i` , create your own Spotify application, then copy the `Client ID` and the `Client secret` into a `.env.local` file with those other values

[Spotify Dev Dashboard link](https://developer.spotify.com/dashboard)

```
SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
NEXTAUTH_SECRET=l1hL3QoJgFdKexL0hKyPzIqZK6RFE1Kw4VRN8Yn0Z/yd5l4IUKsHjQ4+KOqLPl0LuflKuLe1U5yt9z4vBVkOBQ==
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SPOTIFY_TOKEN=https://accounts.spotify.com/api/token
NEXT_PUBLIC_SPOTIFY_URL=https://api.spotify.com/v1/
```

### Secondly
In your spotify app, add this url within the `Redirect URIs` section (otherwise, Spotify will stop you from making request from their API).
```
http://localhost:3000/api/auth/callback/spotify
```
This url is auto-generate by the package `next-auth` for the provider Spotify.

### Finally
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
