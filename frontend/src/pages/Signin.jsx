import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { Inputbox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import { Bottomwarning } from "../components/Bottomwarning";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function Signin(){
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const navigate = useNavigate()

    async function handleSignin(){
        try{
            const response = await axios.post("https://paytm-demo-backend.vercel.app/api/v1/user/signin",{
                username,
                password
            })
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard",{replace:true})
        } catch(err){
            if(err.response.status == 411){
                alert("Username or password incorrect")
            } else if(err.response.status == 400){
                alert("Username and password required")
            }else{
                alert("No such user found")
            }
        }
            
        
    }
    return(
        <div className=" bg-slate-300 h-screen w-screen">
            <div className="flex justify-center py-5">
                <div className="bg-white rounded-lg text-center w-80">
                    <Heading label = {"Sign In"}></Heading>
                    <Subheading label = {"Enter your details to signin to your account"}></Subheading>
                    <Inputbox onChange={(e)=>{
                        setUsername(e.target.value);
                    }} label = {"Email"} placeholder={"Enter your email"}></Inputbox>
                    <Inputbox onChange={(e)=>{
                        setPassword(e.target.value);
                    }} label = {"Password"} placeholder={"Enter your password"}></Inputbox>
                    <div className="pt-4">
                        <Button onChange={handleSignin} label={"Submit"}></Button>
                    </div>
                    <Bottomwarning label={"Don't have an account ?"} buttonText={" Sign up"} to={"/signup"}></Bottomwarning>
                </div>
            </div>
        </div>
    )
}