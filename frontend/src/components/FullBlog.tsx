import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import BlogUser from "../Pages/BlogUser";

const FullBlog = () => {
    const { id } = useParams();
    const { blog } = useBlog({ id: id || "" });
  return (
    <div>
        <BlogUser blog={blog}/>
    </div>
  ) 
}

export default FullBlog