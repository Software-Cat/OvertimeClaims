export interface ClaimContent {
    id: string
    title: string
    datetime: {
        seconds: number
        nanoseconds: number
    }
    approved: boolean
}

export default function Claim({
    claimContent,
    onUpdateClaimStatus,
}: {
    claimContent: ClaimContent
    onUpdateClaimStatus: Function
}) {
    return (
        <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
                <p className="text-gray-500">{claimContent.datetime.seconds}</p>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a>
                        <span className="absolute inset-0" />
                        {claimContent.title}
                    </a>
                </h3>
            </div>
            <p>
                Is it approved: <em>{claimContent.approved ? "yes" : "no"}</em>
            </p>
            <h2>Change approval status:</h2>
            <button
                onClick={async () => {
                    await onUpdateClaimStatus(
                        claimContent,
                        !claimContent.approved
                    )
                }}
                className="my-3 rounded-lg shadow-xl bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
                {claimContent.approved ? "TO NOT APPROVED" : "TO APPROVED"}
            </button>
        </article>
    )
}
