import { IoCreateOutline } from "react-icons/io5";
import img from "../assets/medium-icon-svgrepo-com.svg"
import { Link } from "react-router-dom";

export const Navbar = ()=>{
    return (
        <div className="navbar w-full flex justify-between px-[2vw]">
            <div className="flex items-center gap-2">
                <img src={img} alt="" className="h-8 w-8"/>
                <h1 className="text-xl font-bold">Medium</h1>
            </div>
            <div className="">
                <div className=" text-base font-medium">
                    <Link to={"/createblog"} className="flex items-center  gap-1">
                        <IoCreateOutline />
                        <h2>Write</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}