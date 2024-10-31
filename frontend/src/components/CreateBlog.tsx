import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";



const CreateBlog = () => {  
  
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading state


  const handlePublish = async () => {
    
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }
    
    setLoading(true);
    setError(""); // Reset error before making a request

    try {
      const response = await axios.post(`${BACKEND_URL}/app/v1/blog`, {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the authorization header
      },
      }
    );
      console.log(response);
      navigate("/blog");
    } catch (err) {
      console.error(err);
      setError("Failed to publish the blog. Please try again."); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <div className="topbar flex justify-between w-[70vw] p-[2vw]">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Medium</h1>
          <h2 className="text-gray-500">Draft in </h2>
        </div>
        <div className="flex items-center">
          <button
            onClick={handlePublish}
            disabled={loading} // Disable button when loading
            className={`btn ${loading ? "bg-gray-400" : "bg-green-600"} text-white rounded-xl px-[2vh] py-[1vh]`}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
          <Link to = {"/blog"} className="ml-[1vh] bg-gray-400 rounded-xl">
            <h2 className=" px-[2vh] py-[1vh]">Home</h2>
          </Link>
        </div>
      </div>
      <div className="w-[70vw] px-[5vw] flex flex-col gap-4">
        {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
        <div className="flex items-center justify-center gap-2 ">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="text-5xl w-full focus:outline-none px-2"
          />
        </div>
        <div>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            className="text-xl w-full h-[50vh] resize-none focus:outline-none pt-2 px-2"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
