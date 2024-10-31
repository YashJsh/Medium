import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog{
    "content" : string ,
    "title": string,
    "id": number,
    "author": {
            "name": string 
    }
    "publishDate" : string
}

export const useBlog = ({id} : {id: string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog ] = useState<Blog | null>(null)

    useEffect(()=>{ 
        axios.get(`${BACKEND_URL}/app/v1/blog/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            } 
        })
            .then(response =>{
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [])
    //console.log(`Bearer${localStorage.getItem("token")}`
    return{
        loading,
        blog,
    }
}

export const useBlogs = ()=>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs ] = useState<Blog[]>([])

    useEffect(()=>{ 
        axios.get(`${BACKEND_URL}/app/v1/blog/bulk`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response =>{
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])
    console.log(`Bearer${localStorage.getItem("token")}`)
    return{
        loading,
        blogs,
    }
}