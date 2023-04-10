import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "@/firebaseConfig"
import { FormEvent } from "react"

export default function NewClaimForm() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        // Prevent the default form redirect
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        await addDoc(collection(db, "claims"), {
            title: formData.get("title"),
            datetime: Timestamp.fromDate(new Date()),
            approved: false,
        })

        // Return false to avoid redirect
        return false
    }

    return (
        <form
            className="border-dashed border-2 border-fuchsia-950 p-10 rounded-lg shadow-md"
            onSubmit={onSubmit}
        >
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Create a New Claim Here
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be
                        careful what you input.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Title Here"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
