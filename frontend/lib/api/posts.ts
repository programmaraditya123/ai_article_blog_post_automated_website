import { PostResponse } from "@/types/articles"


export async function fetchPosts(
    lastId?:string,
    limit : number = 10
):Promise<PostResponse>{
    const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API
    const url = new URL(`${BASE_URL}/getpost/allposts`)
    if(lastId) url.searchParams.set("lastId",lastId)
    url.searchParams.set("limit",limit.toString())

    const res = await fetch(url.toString())
    if(!res.ok) throw new Error("Failed to fetch posts")

    return res.json()
}

export async function getPost(slug:string): Promise<any|null>{
    const fslug = slug.split("-").pop()
    console.log("+++++++++++",slug)
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API
        const res = await fetch(`${BASE_URL}/getpost/${fslug}`,{cache:"no-store"})
        
        if(!res.ok) return null;
        return await res.json();
        
    } catch (error) {
        console.log("Error",error)
        
    }


}
