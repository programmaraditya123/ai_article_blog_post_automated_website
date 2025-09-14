
// @ts-ignore
export async function fetchArticleBlogPost():Promise<any | null>{
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API
        const res = await fetch(`${BASE_URL}/getarticleblogpost`,{cache:"no-store"})
        
        if(!res.ok) return null;
        return await res.json();
        
    } catch (error) {
        console.log("Error",error)
        
    }
}