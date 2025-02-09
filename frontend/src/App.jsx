import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Signup } from "./pages/Signup.jsx"
import "./App.css"
import { Signin } from "./pages/Signin.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { SendMoney } from "./pages/Sendmoney.jsx"
import { Welcome } from "./pages/Welcome.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Welcome />}></Route>
        <Route path = "/signup" element = {<Signup />}></Route>
        <Route path = "/signin" element = {<Signin />}></Route>
        <Route path = "/dashboard" element = {<Dashboard />}></Route>
        <Route path = "/sendmoney" element = {<SendMoney />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
