import {Params} from "next/dist/shared/lib/router/utils/route-matcher";

export default function Page({params: {id}}: {
    params: Params
}) {
    return <div>
        je suis une autre page de test, on test en mettant un param de next en interface, {id}
    </div>
}
