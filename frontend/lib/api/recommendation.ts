import { Recommendations } from "@/types/articles"

export async function getRecommendations(
  query: string
): Promise<Recommendations> {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_PYTHON_API
    if (!BASE_URL) {
      console.error("NEXT_PUBLIC_PYTHON_API is not defined")
      return [] as unknown as Recommendations
    }

    const url = new URL(`${BASE_URL}/recommendation`)
    if (query) url.searchParams.set("query", query)

    const res = await fetch(url.toString(), { cache: "no-store" })

    if (!res.ok) {
      console.error("Recommendation API returned error:", res.status, res.statusText)
      return [] as unknown as Recommendations
    }

    return res.json()
  } catch (err) {
    console.error("Failed to fetch recommendations:", err)
    return [] as unknown as Recommendations
  }
}




// import { Recommendations } from "@/types/articles"

// export async function getRecommendations(
//     query : string
// ):Promise<Recommendations>{
//     const BASE_URL = process.env.NEXT_PUBLIC_PYTHON_API
//     const url = new URL(`${BASE_URL}/recommendation`)
//     if(query) url.searchParams.set("query",query)


//     const res = await fetch(url.toString(),{cache:"no-store"})
//     if(!res.ok) throw new Error("Failed to get recommendations")

//     return res.json()
// }
