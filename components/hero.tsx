import Claim, { ClaimContent } from "./claim"
import { useState } from "react"
import {
    getDocs,
    collection,
    query,
    orderBy,
    setDoc,
    doc,
} from "firebase/firestore"
import { db } from "@/firebaseConfig"
import NewClaimForm from "./new-claim-form"

export default function Hero() {
    const [claimContents, setClaimContents] = useState<Array<ClaimContent>>([])

    async function updateClaimList() {
        const claimQuery = query(collection(db, "claims"), orderBy("datetime"))
        const querySnapshot = await getDocs(claimQuery)
        setClaimContents([])
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data())
            setClaimContents((claimContents) => [
                ...claimContents,
                {
                    id: doc.id,
                    title: doc.get("title"),
                    datetime: doc.get("datetime"),
                    approved: doc.get("approved"),
                },
            ])
        })
    }

    async function updateApprovalStatus(
        currentContent: ClaimContent,
        newStatus: boolean
    ) {
        const claimRef = doc(db, "claims", currentContent.id)
        await setDoc(claimRef, {
            title: currentContent.title,
            datetime: currentContent.datetime,
            approved: newStatus,
        })
        updateClaimList()
    }

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Claims.
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Create a new claim here:
                    </p>
                    <NewClaimForm></NewClaimForm>
                </div>
                <button
                    onClick={async () => {
                        await updateClaimList()
                    }}
                    className="my-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Refresh
                </button>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {claimContents.map((x) => (
                        <Claim
                            onUpdateClaimStatus={updateApprovalStatus}
                            key={x.id}
                            claimContent={x}
                        ></Claim>
                    ))}
                </div>
            </div>
        </div>
    )
}
