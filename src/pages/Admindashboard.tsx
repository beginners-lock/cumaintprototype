import Sidebar from '../components/Sidebar';
import Menu from './Menu.tsx';
import { useState, useEffect } from 'react';
import { firebaseConfig } from "../firebaseconfig.ts";
import { initializeApp } from "firebase/app";
import { ref, getDatabase,  update, onValue } from "firebase/database";

export default function Admindashboard(){
    initializeApp(firebaseConfig);
    const db = getDatabase();

    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

    const [name, setName] = useState('');
    const [complaintsarray, setComplaintsarray] = useState<any[]>([]);
    const [complaintsids, setComplaintsids] = useState<string[]>([]);
    const filter = '';

    const [total, setTotal] = useState(0);
    const [solved, setSolved] = useState(0);
    const [pending, setPending] = useState(0);
    const [revoked, setRevoked] = useState(0);

    const [coordinates, setCoordinates] = useState({top:'', left:''});
    const [activecomplaintuserid, setActivecomplaintuserid] = useState('');
    const [activecomplaintrowid, setActivecomplaintrowid] = useState('');

    const issuesref = ref(db, 'cumaint/Issues');

    useEffect(()=>{
        if(id?.includes('admin') && id?.slice(5)===import.meta.env.VITE_ADMIN_ID){
            setName('Admin');
        }else{
            sessionStorage.clear();
            window.location.href='/adminlogin';
        }

        const unsub = onValue(issuesref, (snapshot) => {
            let data = snapshot.val();
            
            if(data){
                let vals = Object.values(data).reverse();
                let ids = Object.keys(data).reverse();

                //Now arrange them according to total, solved, pending, revoked
                let solvednum=0; let pendingnum=0; let revokednum=0;
                
                vals.map((val: any)=>{
                    if(val.status==="solved"){ solvednum+=1; }
                    if(val.status==="pending"){ pendingnum+=1; }
                    if(val.status==="revoked"){ revokednum+=1; }
                });

                setComplaintsarray(vals);
                setComplaintsids(ids);
                setTotal(vals.length); setSolved(solvednum); setPending(pendingnum); setRevoked(revokednum);
            }else{
                setComplaintsarray([]);
                setComplaintsids([]);
            }
        });

        return ()=>{ unsub(); }
    }, []);

    const logout = () => {
        sessionStorage.clear();
        window.location.href = '/adminlogin';
    }

    const dropmenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, userid: string, rowid: string) => {
        setActivecomplaintuserid(userid); setActivecomplaintrowid(rowid);
        setCoordinates({ top: (e.clientY).toString()+'px', left: (e.clientX-100).toString()+'px' });
    }

    const solvedcomplaint = () => {
        if(activecomplaintrowid!==''){
            const complaintref = ref(db, 'cumaint/Issues/'+activecomplaintrowid);
            update(complaintref, {status: 'solved'}).then(()=>{
                setActivecomplaintuserid(''); setActivecomplaintrowid('');
            });
        }
    }
    
    const revokecomplaint = () => {
        if(activecomplaintrowid!==''){
            const complaintref = ref(db, 'cumaint/Issues/'+activecomplaintrowid);
            update(complaintref, {status: 'revoked'}).then(()=>{
                setActivecomplaintuserid(''); setActivecomplaintrowid('');
            });
        }
    }

    return(
    <div id="dashboardpage" className='pl-[300px] pr-6 pt-6 w-full h-full bg-white'>
        <Sidebar
            userid={id}
            firstname={'CU Maint'}
            lastname={'Admin'}
            admin={true}
            email={import.meta.env.VITE_ADMIN_EMAIL}
            logout={()=>{logout();}}
        />
        <Menu
            show={activecomplaintuserid!==''}
            top={coordinates.top}
            left={coordinates.left}
            deletecomplaint={()=>{ }}
            solvedcomplaint={()=>{ solvedcomplaint(); }}
            revokecomplaint={()=>{ revokecomplaint(); }}
            closemenu={()=>{ setActivecomplaintuserid(''); setActivecomplaintrowid(''); }}
            admin={true}
            owner={id===activecomplaintuserid}
        />
        <div className='w-full'>
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
                        <div className='text-xl font-bold'>{'Welcome '+name}</div>
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

                <div className='mt-6 flex flex-row items-center justify-start'>
                    <div className='flex flex-row items-center justify-start px-2 py-2 rounded-md cursor-pointer' style={{backgroundColor:filter==='hall'?'#FAEEFC':'#F0F2F5', border:filter==='hall'?'1px transparent solid':'1px #D0D5DD solid'}}>
                        <img src={filter==='hall'?"icons/active-bubble.svg":"icons/bubble.svg"} alt="" />
                        <p className='text-sm ml-2 font-semibold'>Electricity</p>
                        <div className='text-xs ml-2 px-3 py-0.5 rounded-full' style={{color:filter==='hall'?'white':'#344054', backgroundColor:filter==='hall'?'#814789':'#E4E7EC'}}>{/*hallnum*/}</div>
                    </div>

                    <div className='ml-6 flex flex-row items-center justify-start px-2 py-2 rounded-md cursor-pointer' style={{backgroundColor:filter==='hall'?'#FAEEFC':'#F0F2F5', border:filter==='hall'?'1px transparent solid':'1px #D0D5DD solid'}}>
                        <img src={filter==='hall'?"icons/active-bubble.svg":"icons/bubble.svg"} alt="" />
                        <p className='text-sm ml-2 font-semibold'>Furniture</p>
                        <div className='text-xs ml-2 px-3 py-0.5 rounded-full' style={{color:filter==='hall'?'white':'#344054', backgroundColor:filter==='hall'?'#814789':'#E4E7EC'}}>{/*collegenum*/}</div>
                    </div>
                    
                    <div className='ml-6 flex flex-row items-center justify-start px-2 py-2 rounded-md cursor-pointer' style={{backgroundColor:filter==='hall'?'#FAEEFC':'#F0F2F5', border:filter==='hall'?'1px transparent solid':'1px #D0D5DD solid'}}>
                        <img src={filter==='hall'?"icons/active-bubble.svg":"icons/bubble.svg"} alt="" />
                        <p className='text-sm ml-2 font-semibold'>Water</p>
                        <div className='text-xs ml-2 px-3 py-0.5 rounded-full' style={{color:filter==='hall'?'white':'#344054', backgroundColor:filter==='hall'?'#814789':'#E4E7EC'}}>{/*librarynum*/}</div>
                    </div>

                    <div className='ml-6 flex flex-row items-center justify-start px-2 py-2 rounded-md cursor-pointer' style={{backgroundColor:filter==='hall'?'#FAEEFC':'#F0F2F5', border:filter==='hall'?'1px transparent solid':'1px #D0D5DD solid'}}>
                        <img src={filter==='hall'?"icons/active-bubble.svg":"icons/bubble.svg"} alt="" />
                        <p className='text-sm ml-2 font-semibold'>Toilet</p>
                        <div className='text-xs ml-2 px-3 py-0.5 rounded-full' style={{color:filter==='hall'?'white':'#344054', backgroundColor:filter==='hall'?'#814789':'#E4E7EC'}}>{/*chapelnum*/}</div>
                    </div>

                    <div className='ml-6 flex flex-row items-center justify-start px-2 py-2 rounded-md cursor-pointer' style={{backgroundColor:filter==='hall'?'#FAEEFC':'#F0F2F5', border:filter==='hall'?'1px transparent solid':'1px #D0D5DD solid'}}>
                        <img src={filter==='hall'?"icons/active-bubble.svg":"icons/bubble.svg"} alt="" />
                        <p className='text-sm ml-2 font-semibold'>Others</p>
                        <div className='text-xs ml-2 px-3 py-0.5 rounded-full' style={{color:filter==='hall'?'white':'#344054', backgroundColor:filter==='hall'?'#814789':'#E4E7EC'}}>{/*othersnum*/}</div>
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
                                        <div className='text-sm w-[56%] box-border py-2'>
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
                                            <img src="icons/more.svg" className='w-400' alt="more"/>
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