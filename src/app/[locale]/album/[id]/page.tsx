import {Params} from "next/dist/shared/lib/router/utils/route-matcher";


export default function Album({params: {id}}: {
    params: Params
}) {
    return (
        <div>
            coucou
        </div>
    );
}
