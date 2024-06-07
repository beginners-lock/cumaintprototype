type SidebarProps = {
    userid: string | null
    firstname: string
    lastname: string
    admin: boolean
    email: string
    logout: ()=>void
}

export default function Sidebar({ userid, firstname, lastname, admin, email, logout }: SidebarProps) {
    const active = 'dashboard';

    const openhallform = () => {
        const urlstring = window.location.search;
        const params = new URLSearchParams(urlstring);
        const id = params.get('id');
        console.log(id);
        let data = JSON.stringify({
            userid: id,
            building: 'Hall of Residence',
            title: '',
            body: '',
            day: '',
            time:'',
            status: 'pending',
            specifics1: '',
            specifics2: ''
        });

        sessionStorage.setItem('cumaintform', data);
        window.location.href="/hallform?id="+userid
    }

  return (
    <div className="w-[272px] p-4 fixed h-full left-0 top-0 flex flex-col justify-between" style={{borderRight:'1px solid #F0F2F5'}}>
        <div>
            <div className='h-[75px] flex items-center'>
                <img className="w-10 h-10" src="icons/cu.logo.svg" alt="" />
                <p className="text-[#8E548E] font-semibold text-md">Covenant University</p>
            </div>
            <div className="flex items-center w-full" style={{borderBottom:'1px solid #F0F2F5'}}>
                <ul className="w-full mt-4">
                    <li className="w-full mb-4 h-12 rounded-md text-md pl-4 flex items-center cursor-pointer" style={{background:active==='dashboard'?'#FAEEFC':'transparent'}}> 
                        <img src="icons/house.svg" alt="" className="pr-2"/>
                        Dashboard
                    </li>

                    <li className="w-full mb-4 h-12 rounded-md text-md pl-4 flex items-center cursor-pointer" style={{display:admin?'none':'flex'}} onClick={()=>{ openhallform(); }}> 
                        <img src="icons/chat.svg" alt="" className="pr-2"/>
                        File a complaint
                    </li>

                    <li className="text-red-700 font-semibold w-full mb-4 h-12 rounded-md text-md pl-4 flex items-center cursor-pointer" onClick={()=>{ logout(); }}> 
                        Logout
                    </li>
                </ul>
            </div>
        </div>
        
        <div className="flex flex-row items-center justify-start mb-6">
            <div className="user-img">
                <div className="bg-[#D9D9D9] w-10 h-10 rounded-full flex flex-row items-center justify-center">
                    {firstname&&lastname ? (firstname.slice(0,1)+lastname.slice(0,1)).toUpperCase() : ''}
                </div>
            </div>
            <div className="pl-2">
                <p className="text-sm font-bold">{firstname && lastname ? firstname+' '+lastname :''}</p>
                <p className="text-xs text-[#475367]">{email ? email.length>32?email.slice(0,30)+'...':email : ''}</p>
            </div>
        </div>
    </div>
  )
}
