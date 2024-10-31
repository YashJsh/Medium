import { Link, useNavigate } from "react-router-dom";
import { UserDetail } from "../components/UserDetail";
import { Button } from "../components/Button";
import { useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="h-screen w-screen flex">
            <div className=" w-full flex justify-center items-center">
                <div className="flex flex-col w-fit h-fit py-[4vh] gap-2 ">
                    <div className="flex flex-col gap-2 text-center items-center px-[6vw]">
                        <h1 className="text-4xl font-semibold">Create an account</h1>
                        <h3 className="text-lg text-slate-500">
                        Already have an account? <Link className="underline text-blue-500" to={"/signin"}>Login</Link>
                        </h3>
                    </div>
                    <div className="flex flex-col gap-2 mx-[3vw]">
                        <UserDetail label1={"Username"} label2={"johndoe12"} type={"text"} onChange = {(e)=>{
                            setUsername(e.target.value);
                        }} />
                        <UserDetail label1={"Email"} label2 = {"johndoe12@gmail.com"} type={"text"} onChange = {(e)=>{
                            setEmail(e.target.value);
                        }}/>
                        <UserDetail label1={"Password"} label2 = {"********"} type={"password"} onChange = {(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </div>
                    <div className="flex justify-center">
                        <Button label1={"Sign Up"} onClick = { async ()=>{
                            const response = await axios.post(`${BACKEND_URL}/app/v1/user/signup`, 
                                { 
                                    name : username,
                                    email : email,
                                    password : password
                                }
                            )
                            const jwt = response.data.jwt;
                            localStorage.setItem("token", jwt);  
                            navigate("/blog")
                        }}/>
                    </div>
                   
                </div>
            </div>
            <div className="bg-slate-200 w-full flex justify-center items-center">
                <div className="flex flex-col justify-center w-[40vw] items-center gap-2">
                    <div>
                        <h2 className="text-xl font-medium">"A platform where users can create, publish, and explore articles with interactive features such as customizable text editing, personalized user profiles, and engagement tools including comments, likes, and tailored content recommendations."</h2>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                        <h2 className="">
                            Jules Winnfield
                        </h2>
                        <h2 className="text-sm text-slate-800">
                            CEO, Acme Inc
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;