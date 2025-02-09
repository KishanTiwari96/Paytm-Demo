export function Inputbox({label,placeholder,onChange}){
    return(
        <div className="pt-4 text-left text-sm px-1 ">
            {label}
            <div>
                <input onChange={onChange} className="w-full border border-gray-500 rounded-sm py-1 pl-1" type="text" placeholder={placeholder} />
            </div>
        </div>
    )
}