import { Link } from "react-router-dom";

interface BlogCard{
    id : number;
    authorName: string;
    title : string;
    content : string;
    publishDate : string;
}

export const BlogCard = (
    {
        id,
        authorName,
        title,
        content,
        publishDate
    } : BlogCard
)=>{
    return <Link to={`/blog/${id}`}>
        <div className="flex flex-col gap-1 max-w-[50vw] border-b-[1px] border-gray-700 p-4 cursor-pointer ">
            <div className="flex font-normal text-sm gap-2">

                <div className="rounded-full h-[3vh] w-[3vh] bg-black text-white text-center mr-[2px] ">{authorName[0]}</div>
                <h3>{authorName}</h3>
                <h3 className="text-gray-400">. {publishDate}</h3>
            </div>
            <div className="font-bold text-2xl">
                {title}
            </div>
            <div className="font-normal text-lg">
                {content.slice(0,250)+ "..."}
            </div>
            <div className="font-normal text-gray-400 text-xs">
                {`${Math.ceil(content.length/250)} min read`}
            </div>
        </div>
    </Link>
}