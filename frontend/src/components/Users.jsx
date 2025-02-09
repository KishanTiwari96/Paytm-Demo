import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function Users(){
    const [user,setUser] = useState([]);
    const [input,setInput] = useState("");
    const token = localStorage.getItem("token");

    useEffect(()=>{
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, "", window.location.href);
        };
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + input,{
            headers : {
                Authorization : "Bearer " + token
            }
        })
            .then((res)=>{
                setUser(res.data.users);
            }).catch(err=>{
                console.error("Error fetching users:", err);
            })
    },[input,token])
    return(
        <div>
            <div className="pl-3 font-bold">
                Users
            </div>
            
            <input onChange={(e)=>{
                setInput(e.target.value)
            }} className=" w-full border border-gray-500 rounded-sm m-2 px-2" type="text" placeholder="Search users..." />
            <div>
                {user.map(users=>
                    <User user = {users} />
                )}  
            </div>
            
        </div>
    )
}

function User({user}){
    const navigate = useNavigate()
    return(
        <div className="m-2 flex justify-between items-center">
            <div className="flex items-center">
                <div className=" mr-2 w-8 h-8 border-4 border-blue-200 rounded-full flex items-center justify-center bg-gray-200">
                    {user.firstName[0]}
                </div>
                {user.firstName} {user.lastName}
            </div>
            
            <button onClick={(e)=>{
                navigate("/sendmoney?id=" + user._id + "&name=" + user.firstName)
            }} type="button" className="focus:outline-none text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 ">Send money</button>
        </div>
    )
}