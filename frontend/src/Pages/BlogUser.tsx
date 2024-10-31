import { Link } from "react-router-dom";
import img from "../assets/medium-icon-svgrepo-com.svg";
import { Blog } from "../hooks";
import { Skeleton } from "../components/Skeleton";

const BlogUser = ({ blog }: { blog: Blog | null }) => {
  if (!blog) {
    return (
      <div className="w-full">
        <div className="navbar w-full flex justify-between px-[4vw] py-[2vh] ">
          <div className="flex items-center gap-2">
            <img src={img} alt="" className="h-8 w-8" />
            <h1 className="text-xl font-bold">Medium</h1>
          </div>
          <div className="flex items-center">
            <div className="text-base font-medium">
              <Link to="/blog">
                <h2>Home</h2>
              </Link>
            </div>
          </div>
        </div>
        <div className="topbar ml-[20vw] mt-[4vh] w-[50vw]">
          {Skeleton()}
          {Skeleton()}
          {Skeleton()}
        </div>
      </div>
    ); // Fallback if blog is undefined or null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar w-full flex justify-between px-[4vw] py-[2vh] ">
        <div className="flex items-center gap-2">
          <img src={img} alt="" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Medium</h1>
        </div>
        <div className="flex items-center">
          <div className="text-base font-medium">
            <Link to="/blog">
              <h2>Home</h2>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex w-full flex-grow cursor-pointer">
        <div className="basis-3/5 ">
          {/* Content for the 60% width div */}
          <div className="h-auto mt-[10vh] mx-[4vw] flex flex-col gap-4">
            <h1 className="text-start  text-5xl font-bold">{blog.title}</h1>
            <h2 className="text-gray-500">Posted on {blog.publishDate}</h2>
            <h2 className="text-start">{blog.content}</h2>
          </div>
        </div>

        <div className="basis-2/5">
          {/* Content for the 40% width div */}
          <div className="h-auto bg-red mt-[10vh] mx-[4vw] flex flex-col gap-2">
            <h2 className="text-gray-500">Author</h2>
            <p>{blog.author.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogUser;
