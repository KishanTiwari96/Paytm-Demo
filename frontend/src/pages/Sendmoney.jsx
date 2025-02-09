import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount,setAmount] = useState(0);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signin",{replace:true})
        }
    },[navigate])

    async function handleTransfer(){
        setLoading(true);
        setSuccess(false);
        try{
            await axios.post("http://localhost:3000/api/v1/account/transfer",{
                to:id,
                amount
            },{
                headers:{
                    authorization : "Bearer " + localStorage.getItem("token")
                }
            })
            setSuccess(true);
        } catch(err){
            if(err.response.status == 400){
                alert("Insufficient Balance")
            } else if (err.response.status == 401){
                alert("Amount cannot be zero")
            }else{
                return res.status(500).json({
                    msg : "Error occurs"
                })
            }
           
        } finally {
            setLoading(false)
        }
                
    }

    return (
        <div className="flex justify-center items-center bg-slate-500 h-screen">
            {loading && (
                <div className="bg-slate-500 h-full w-full flex justify-center items-center absolute inset-0">
                    <span class="relative flex size-3">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                    <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                    </span>
                </div>
            )}
            
            {success && (
                    <div className="absolute inset-0 flex justify-center items-center bg-slate-500 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg flex flex-col items-center">
                            <div className="text-green-500 text-4xl mr-4 ">✔️</div>
                            <div className="text-2xl font-semibold">Transaction Successful</div>
                            <button onClick={()=>{
                                navigate("/dashboard")
                            }} className="bg-black hover:bg-gray-500 text-white p-3 mt-8 rounded-md flex justify-center">Go back to dashboard</button>
                        </div>
                    </div>
            )}

            <div className="border border-black bg-white rounded-md w-[350px] h-[350px] ">
                <div className="pt-5">
                  <div className=" flex justify-center text-3xl font-bold">
                        Send Money 
                    </div>
                    <div className="   ">
                        <div className="flex flex-row mt-15 pl-5 items-center"> 
                            <div className="border rounded-full mr-1 p-2 w-7 h-7 flex flex-col justify-center text-xl">
                                {name[0].toUpperCase()}
                            </div>
                            <div className="text-2xl font-semibold">{name}</div>
                        </div>  
                        <div className="flex flex-col pl-5 pr-5 mt-4 text-2xl">
                            Amount (in Rs)
                            <input onChange={(e)=>{
                                setAmount(e.target.value)
                            }} disabled={loading} className="border border-black rounded-sm mt-2" type="text" placeholder="Enter amount"/>
                        </div>
                        
                    </div>
                    <div className="pl-5 pr-5 pt-13">
                        <button onClick={handleTransfer} disabled={loading} className="bg-green-500 w-full h-10 rounded-sm hover:bg-green-700">Send Money</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
