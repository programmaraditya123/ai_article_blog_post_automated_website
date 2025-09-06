import { ArticleResponse, Articles } from "@/types/articles";
 


export async function fetchArticles(
    lastId?:string,
    limit : number = 10
):Promise<ArticleResponse>{
    const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API
    const url = new URL(`${BASE_URL}/getarticle/allarticles`)
    console.log("///////////",url)
    if(lastId) url.searchParams.set("lastId",lastId)
    url.searchParams.set("limit",limit.toString())

    const res = await fetch(url.toString())
    if(!res.ok) throw new Error("Failed to fetch articles")

    return res.json()
}

// @ts-ignore
export async function getArticle(slug:string): Promise<Articles|any|null>{
    const fslug = slug.split("-").pop()
    console.log("+++++++++++",slug)
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API
        const res = await fetch(`${BASE_URL}/getarticle/${fslug}`,{cache:"no-store"})
        
        if(!res.ok) return null;
        return await res.json();
        
    } catch (error) {
        console.log("Error",error)
        
    }


}