import { BlogResponse } from "@/types/articles"


export async function fetchBlogs(
    lastId?:string,
    limit : number = 10
):Promise<BlogResponse>{
    const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API
    const url = new URL(`${BASE_URL}/getblog/allblogs`)
    if(lastId) url.searchParams.set("lastId",lastId)
    url.searchParams.set("limit",limit.toString())

    const res = await fetch(url.toString())
    if(!res.ok) throw new Error("Failed to fetch blogs")

    return res.json()
}


// @ts-ignore
export async function getBlog(slug:string): Promise<any|null>{
    const fslug = slug.split("-").pop()
    console.log("+++++++++++",slug)
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API
        const res = await fetch(`${BASE_URL}/getblog/${fslug}`,{cache:"no-store"})
        
        if(!res.ok) return null;
        return await res.json();
        
    } catch (error) {
        console.log("Error",error)
        
    }


}
