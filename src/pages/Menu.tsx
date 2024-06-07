type MenuProps = {
    show: boolean
    top: string
    left: string
    admin: boolean
    owner: boolean
    deletecomplaint: ()=>void
    revokecomplaint: ()=>void
    solvedcomplaint: ()=>void
    closemenu: ()=>void
}

export default function Menu({show, top, left, admin, owner, deletecomplaint, revokecomplaint, solvedcomplaint, closemenu}: MenuProps){
    return(
        <div className="fixed w-[100px] bg-white shadow-xl rounded-lg flex-col items-start justify-start pt-2.5 px-2.5" style={{display:show?'flex':'none', border:'1px lightgrey solid', top:top, left:left}}>
            <div className="w-full flex flex-row items-center justify-end mb-2">
                <img className="w-4 h-4 cursor-pointer" src="icons/modalclose.png" onClick={()=>{ closemenu(); }}/>
            </div>
            <div className="cursor-pointer text-sm mb-2.5 text-red-700 font-semibold" style={{display:owner?'flex':'none'}} onClick={()=>{ deletecomplaint(); }}>Delete</div>
            <div className="cursor-pointer text-sm mb-2.5 text-red-700 font-semibold" style={{display:admin?'flex':'none'}} onClick={()=>{ revokecomplaint(); }}>Revoke</div>
            <div className="cursor-pointer text-sm mb-2.5 text-green-700 font-semibold" onClick={()=>{ solvedcomplaint(); }}>Solved</div>
        </div>
    );
}