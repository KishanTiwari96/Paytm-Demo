import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect } from "react";

export function Dashboard(){
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signin",{replace:true})
        }
    },[navigate])
    
    return(
        <div>
            <Appbar></Appbar>
            <div className="m-8">
                <Balance></Balance>
                <Users></Users>
            </div>
        </div>
    )
}