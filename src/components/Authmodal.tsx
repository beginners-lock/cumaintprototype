

type AuthModalProps = {
    show:boolean,
    body: string | JSX.Element,
    close: ()=>void,
    color: string
}

export default function AuthModal({show, body, color, close}: AuthModalProps){
    return(
        <div className="flex-col items-start justify-start absolute right-2 top-20 w-[300px] p-4 shadow-lg rounded-lg" style={{color:color, display:show?'flex':'none', border:'1px lightgrey solid'}}>
            <div className="w-full flex flex-row justify-end"><img className="w-4 cursor-pointer" src="icons/modalclose.png" alt="close" onClick={()=>{ close(); }}/></div>
            <div className="text-sm font-bold underline mb-1">Info</div>
            <div className="text-sm">{
                body
            }</div>
        </div>
    )
}