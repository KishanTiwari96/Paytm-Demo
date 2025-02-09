import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { Inputbox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import { Bottomwarning } from "../components/Bottomwarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const navigate = useNavigate()

    async function handleSignup(){
        try{
            const response = await axios.post("https://paytm-demo-backend.vercel.app/api/v1/user/signup",{
                firstName,
                lastName,
                username,
                password
            })
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard",{replace:true})
        } catch(err){
            if(err.response.status == 401){
                alert("User already exists");
            } else if(err.response.status == 411){
                alert("Password required minimum length of 6");
            } else if(err.response.status == 400){
                alert("Fist name and Last name required minimum length of 3");
            } else if(err.response.status == 500){
                alert("Wrong inputs");
            } else{
                alert("Error in signup")
            }
        }
            
    }
    return(
        <div className=" bg-slate-300 h-screen w-screen">
            <div className="flex justify-center py-5">
                <div className="bg-white rounded-lg text-center w-80">
                    <Heading label = {"Sign up"}></Heading>
                    <Subheading label = {"Enter your details to create an account"}></Subheading>
                    <Inputbox onChange={(e)=>{
                        setFirstName(e.target.value);
                    }} label = {"First Name"} placeholder={"Enter your first name"}></Inputbox>
                    <Inputbox onChange={(e)=>{
                        setLastName(e.target.value);
                    }} label = {"Last Name"} placeholder={"Enter your last name"}></Inputbox>
                    <Inputbox onChange={(e)=>{
                        setUsername(e.target.value);
                    }} label = {"Email"} placeholder={"Enter your email"}></Inputbox>
                    <Inputbox onChange={(e)=>{
                        setPassword(e.target.value);
                    }} label = {"Password"} placeholder={"Enter your password"}></Inputbox>
                    <div className="pt-4">
                        <Button onChange={handleSignup} label={"Submit"}></Button>
                    </div>
                    <Bottomwarning label={"Already have an account ?"} buttonText={" Sign in"} to={"/signin"}></Bottomwarning>
                </div>
            </div>
        </div>
    )
}