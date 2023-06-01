export function SvgIcon({name, width, height, fill}: {
    name: string,
    width?: number;
    height?: number;
    fill?: string
}) {
    const availableNames = ['moon', 'sun', 'filter', 'link-external'];

    if (!availableNames.includes(name)) {
        return null;
    }

    const renderIcon = () => {
        switch(name) {
            case 'moon':
                return (
                    <path
                        d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
                        fill={fill ? fill : 'currentColor'}
                    />
                )
            case 'filter':
                return (
                    <path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z" />
                )
            case 'link-external':
                return (
                    <><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></>
                )
            default:
                return (
                    <g fill={fill ? fill : 'currentColor'}>
                        <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
                        <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
                    </g>
                )
        }
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || 24}
            height={height || 24}
            viewBox="0 0 24 24">
            {renderIcon()}
        </svg>
    )
}
