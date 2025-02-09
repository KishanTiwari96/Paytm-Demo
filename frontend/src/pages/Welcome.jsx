import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Welcome(){
    const navigate = useNavigate()
    return (
        <div className="bg-slate-500 h-screen w-screen">
            <div className="text-6xl flex flex-col justify-center items-center font-bold pt-9">
                Welcome
                <div className="pt-4">
                    <Button onChange={()=>navigate("/signup")} label={"Signup"}></Button>
                    <Button onChange={()=>navigate("/signin")} label={"Signin"}></Button>
                </div>
            </div>
        </div>
    )
}