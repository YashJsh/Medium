import { BlogCard } from "../components/BlogCard"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa6";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";

const Blog = () => {
    const {loading, blogs} = useBlogs();
    if (loading){
        return (
            <div className="w-full">
                <div className="flex border-b-[1px]  p-[2vh] w-screen">
                    <Navbar/>
                </div>
                <div className="topbar ml-[20vw] mt-[4vh] w-[50vw]">
                    {Skeleton()}
                    {Skeleton()}
                    {Skeleton()}
                </div>
            </div>
        )
    }

  return (
    <div className="w-full flex flex-col items-center">
        <div className="flex border-b-[1px]  p-[2vh] w-screen">
            <Navbar/>
        </div>
        <div className="topbar flex border-b-[1px] w-[50vw] pb-[2vh] border-slate-300 mt-[4vh]">
            <Link className= "text-slate-600 px-[5vh] pb-[1vh]" to="/createblog"><FaPlus /></Link>
        </div>
        <div className="w-[50vw]">
            {blogs.map(blog =><BlogCard
                id = {blog.id}
                authorName = {blog.author.name || "Anonymous"}
                title = {blog.title}
                content = {blog.content}
                publishDate={blog.publishDate}
            />)}
        </div>
    </div>
  )
}

export default Blog