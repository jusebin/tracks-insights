export default function Page({params: {id}}: {
    params: {
        id: string
    }
}) {

    return (
        <div>page random avec un param {id}, le param est une interface custom btw</div>
    )
}
