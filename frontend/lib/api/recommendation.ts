import { Recommendations } from "@/types/articles"

export async function getRecommendations(
    query : string
):Promise<Recommendations>{
    const BASE_URL = process.env.NEXT_PUBLIC_PYTHON_API
    const url = new URL(`${BASE_URL}/recommendation`)
    if(query) url.searchParams.set("query",query)


    const res = await fetch(url.toString(),{cache:"no-store"})
    if(!res.ok) throw new Error("Failed to get recommendations")

    return res.json()
}
