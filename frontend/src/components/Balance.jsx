import axios from "axios";
import { useEffect, useState } from "react"
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Balance(){
    const navigate = useNavigate()
    const [balance,setBalance] = useState(0);

    function handleLogout(){
        console.log("Hi")
        localStorage.removeItem("token");
        navigate("/signin",{replace:true})

        window.history.replaceState(null, "", "/signin");
    }

    const fetchBalance = ()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res=>{
                setBalance(res.data.balance)
            })
    }
    useEffect(()=>{
        fetchBalance()
    },[])
    return(
        <div className="m-3 font-bold pb-2 flex justify-between">
            Your Balance : Rs {balance}
            <Button onChange = {handleLogout} label={"Logout"}></Button>
        </div>
    )
}