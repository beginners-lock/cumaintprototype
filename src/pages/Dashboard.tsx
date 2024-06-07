import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
import { firebaseConfig } from "../firebaseconfig.ts";
import { initializeApp } from "firebase/app";
import { ref, getDatabase, update, onValue, get, push, remove } from "firebase/database";
import Menu from './Menu.tsx';

export default function Dashboard(){
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

    const [filter, setFilter] = useState('');
    const [user, setUser] = useState<any>(null);
    const [complaintsarray, setComplaintsarray] = useState<any[]>([]);
    const [complaintsids, setComplaintsids] = useState<string[]>([]);

    const [total, setTotal] = useState(0);
    const [solved, setSolved] = useState(0);
    const [pending, setPending] = useState(0);
    const [revoked, setRevoked] = useState(0);

    const [hallnum, setHallnum] = useState(0);
    const [collegenum, setCollegenum] = useState(0);
    const [librarynum, setLibrarynum] = useState(0);
    const [chapelnum, setChapelnum] = useState(0);
    const [othersnum, setOthersnum] = useState(0);

    const [coordinates, setCoordinates] = useState({top:'', left:''});
    const [activecomplaintuserid, setActivecomplaintuserid] = useState('');
    const [activecomplaintrowid, setActivecomplaintrowid] = useState('');

    const issuesref = ref(db, 'cumaint/Issues');

    useEffect(()=>{
        let usersession = sessionStorage.getItem('cumainsession');

        if(usersession==='undefined' || usersession===undefined || usersession==='null' || usersession===null){
            sessionStorage.clear();
            window.location.href = '/login';
        }else{
            usersession = JSON.parse(usersession);
            setUser(usersession);
        }

        const unsub = onValue(issuesref, (snapshot) => {
            let data = snapshot.val();
            
            if(data){
                //Filter only those that belong to user
                let vals = Object.values(data);
                let ids  = Object.keys(data);

                let filteredids: any[] = [];
                let filteredvals = vals.filter((val:any, index)=>{
                    if(val.userid===id){
                        filteredids.push(ids[index]);
                        return val;
                    }
                });

                //Now arrange them according to total, solved, pending, revoked
                let solvednum=0; let pendingnum=0; let revokednum=0;
                let hall=0; let college=0; let library=0; let chapel=0; let others=0;
                
                filteredvals.map((val: any)=>{
                    if(val.status==="solved"){ solvednum+=1; }
                    if(val.status==="pending"){ pendingnum+=1; }
                    if(val.status==="revoked"){ revokednum+=1; }
                    if(val.building==="Hall of Residence"){ hall+=1; }
                    if(val.building==="College Building"){ college+=1; }
                    if(val.building==="Library"){ library+=1; }
                    if(val.building==="Chapel"){ chapel+=1; }
                    if(!["Hall of Residence", "College Building", "Library", "Chapel"].includes(val.building)){ others+=1; }
                });

                setComplaintsarray(filteredvals);
                setComplaintsids(filteredids);
                setTotal(filteredvals.length); setSolved(solvednum); setPending(pendingnum); setRevoked(revokednum);
                setHallnum(hall); setCollegenum(college); setLibrarynum(library); setChapelnum(chapel); setOthersnum(others); 
            }else{
                setComplaintsarray([]);
                setComplaintsids([]);
            }
        });

        return ()=>{ unsub(); }
    }, []);

    const logout = () => {
        sessionStorage.clear();
        window.location.href = '/login';
    }

    const dropmenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, userid: string, rowid: string) => {
        setActivecomplaintuserid(userid); setActivecomplaintrowid(rowid);
        setCoordinates({ top: (e.clientY).toString()+'px', left: (e.clientX-100).toString()+'px' });
    }

    const deleterow = () => {
        if(activecomplaintrowid!==''){
            const complaintref = ref(db, 'cumaint/Issues/'+activecomplaintrowid);
            remove(complaintref).then(()=>{
                setActivecomplaintuserid('');  setActivecomplaintrowid('');
            });
        }
    }

    const solvedcomplaint = () => {
        if(activecomplaintrowid!==''){
            const complaintref = ref(db, 'cumaint/Issues/'+activecomplaintrowid);
            update(complaintref, {status: 'solved'}).then(()=>{
                setActivecomplaintuserid(''); setActivecomplaintrowid('');
            });
        }
    }

    return(
    <div id="dashboardpage" className='pl-[300px] pr-6 pt-6 w-full h-full bg-white'>
        <Sidebar
            userid={id}
            firstname={user?.firstname}
            lastname={user?.lastname}
            admin={false}
            email={user?.email}
            logout={()=>{logout();}}
        />
        <Menu
            show={activecomplaintuserid!==''}
            top={coordinates.top}
            left={coordinates.left}
            deletecomplaint={()=>{ deleterow(); }}
            solvedcomplaint={()=>{ solvedcomplaint(); }}
            revokecomplaint={()=>{  }}
            closemenu={()=>{ setActivecomplaintuserid(''); setActivecomplaintrowid(''); }}
            admin={false}
            owner={id===activecomplaintuserid}
        />
        <div className='w-full h-full'>
            <div className='w-full flex flex-row items-center justify-between'>
                <div className='w-[600px] flex flex-row items-center justify-start px-2.5 py-1.5 rounded-lg bg-[#1018280D]'>
                    <img className="search-icon"  src="icons/search-glass.svg" alt="" />
                    <input type="text" placeholder='Search here...' className='bg-transparent ml-2 focus:outline-none active:outline-none w-full'/>
                </div>
                <div className='notify'>
                    <img src="icons/Misc icon.svg" alt=""/>
                </div>
            </div>
            <div className='mt-4'>
                <div className='flex flex-row items-start justify-between'>
                    <div>
                        <div className='text-xl font-bold'>{'Welcome '+ (user? user.firstname : '')}</div>
                        <p className='text-[#475367] text-md'>It’s a sunny day today, we hope you’re taking good care School’s Facilities 😊</p>
                    </div>
                    <div className='flex flex-row justify-between w-[210px] h-[75px] rounded-md p-4 shadow-lg cursor-pointer' style={{border:'1px lightgrey solid'}}>
                        <img className='w-8' src="icons/calender-icon.svg" alt="" />
                        <div>
                            <p className='text-sm'>Today's Date</p>
                            <div className='text-md font-semibold'>{new Date().toString().split(' ').slice(0,4).join(' ')}</div>
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex flex-row items-center justify-between w-full'>
                    <div className='w-[230px] h-[84px] bg-white rounded-md p-4 flex justify-between shadow-lg' style={{border:'1px solid #E4E7EC'}}>
                        <div>
                            <div className='text-sm text-[#475367]'>Total Complaints</div> 
                            <div className='flex flex-row items-center justify-start'>
                                <div className='text-2xl font-bold pr-2 text-black'>{total}</div>
                                <div className='text-sm text-[#475367]'>form filled</div> 
                            </div>
                        </div>
                        <img className="w-12" src="icons/total-complaints.svg" alt="" />                        
                    </div>

                    <div className='w-[230px] h-[84px] bg-white rounded-md p-4 flex justify-between shadow-lg' style={{border:'1px solid #E4E7EC'}}>
                        <div>
                            <div className='text-sm text-[#475367]'>Solved Complaints</div> 
                            <div className='flex flex-row items-center justify-start'>
                                <div className='text-2xl font-bold pr-2 text-black'>{solved}</div>
                                <div className='text-sm text-[#475367]'>solved</div> 
                            </div>
                        </div>
                        <img className="w-12" src="icons/approved-complaints.svg" alt="" />                        
                    </div>

                    <div className='w-[230px] h-[84px] bg-white rounded-md p-4 flex justify-between shadow-lg' style={{border:'1px solid #E4E7EC'}}>
                        <div>
                            <div className='text-sm text-[#475367]'>Pending Complaints</div> 
                            <div className='flex flex-row items-center justify-start'>
                                <div className='text-2xl font-bold pr-2 text-black'>{pending}</div>
                                <div className='text-sm text-[#475367]'>pending</div> 
                            </div>
                        </div>
                        <img className="w-12" src="icons/pending-complaints.svg" alt="" />                        
                    </div>

                    <div className='w-[230px] h-[84px] bg-white rounded-md p-4 flex justify-between shadow-lg' style={{border:'1px solid #E4E7EC'}}>
                        <div>
                            <div className='text-sm text-[#475367]'>Revoked Problems</div> 
                            <div className='flex flex-row items-center justify-start'>
                                <div className='text-2xl font-bold pr-2 text-black'>{revoked}</div>
                                <div className='text-sm text-[#475367]'>revoked</div> 
                            </div>
                        </div>
                        <img className="w-12" src="icons/solved-complaints.svg" alt="" />                        
                    </div>
                </div>

                <div className='w-full mt-6 rounded-lg mb-10' style={{border:'1px #E4E7EC solid'}}>
                    <div className='flex flex-row items-center justify-between items-center bg-[#F9FAFB]' style={{borderBottom:'1px #E4E7EC solid'}}>
                        <p className='text-sm w-[16%] box-border px-4 py-2'>Room number</p>
                        <p className='text-sm w-[56%] box-border py-2'>Complaints</p>
                        <p className='text-sm w-[12%] box-border py-2'>Date and time</p>
                        <p className='text-sm w-[8%] box-border py-2'>Status</p>
                        <p className='w-[6%] box-border py-2'></p>
                    </div>
                    <div className='w-full'>
                        {
                            complaintsarray.length>0?
                                complaintsarray.map((item: any, index: number)=>(
                                    <div key={complaintsids[index]} className='flex flex-row items-center justify-between items-center'>
                                        <div className='text-sm w-[16%] box-border px-4 py-2'>
                                            <h4 className="font-semibold text-[#101928]">{item.specifics1}</h4>
                                            <p className="text-[#475367]">{item.specifics2}</p>
                                        </div>
                                        <div className='text-sm w-[56%] box-border py-2 pr-2'>
                                            <h4 className="font-semibold text-[#101928]">{item.title}</h4>
                                            <p className="text-[#475367]">{item.body.length>300 ? item.body.slice(0, 297)+'...' : item.body}</p>
                                        </div>
                                        <div className='text-sm w-[12%] box-border py-2'>
                                            <h4 className="font-semibold text-[#101928]">{item.day}</h4>
                                            <p className="text-[#475367]">{item.time}</p>
                                        </div>
                                        <div className='text-sm w-[8%] box-border py-2 font-semibold' style={{color:item.status==='pending'?'orange':item.status==='solved'?'green':'red'}}>
                                            {item.status.toUpperCase()}
                                        </div>
                                        <div className='w-[6%] box-border px-4 py-2 flex flex-row justify-center items-center' onClick={(e)=>{ dropmenu(e, item.userid, complaintsids[index]); }}>
                                            <img src="icons/more.svg" className='w-400 cursor-pointer' alt="more"/>
                                        </div>
                                    </div>
                                ))
                            :   ''    
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};