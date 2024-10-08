import Formlist from "../components/Formlist";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { firebaseConfig } from "../firebaseconfig.ts";
import { initializeApp } from "firebase/app";
import LoadingSpinner from "../components/Spinner.tsx";

export default function Hallform() {
    initializeApp(firebaseConfig);

    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

    const [hallerr, setHallerr] = useState(false);
    const [roomerr, setRoomerr] = useState(false);
    const [titleerr, setTitleerr] = useState(false);
    const [bodyerr, setBodyerr] = useState(false);
    const [form, setForm] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [avdate, setAvdate] = useState('');
    const [avtime, setAvtime] = useState('');
    const [dterr, setDTerr] = useState(false);

    //const issuesref = ref(db, 'cumaint/Issues');

    useEffect(()=>{
        const form = sessionStorage.getItem('cumaintform');
        if(form!==null && form!=='null' && form!==undefined && form!=='undefined'){
            const jsonform = JSON.parse(form);
            console.log(jsonform);
            setForm(jsonform);
        }else{
            gotocomplaintform();
        }
    }, []);

    const gotodashboard = () => {
        sessionStorage.removeItem('cumaintform');
        window.location.href = 'studentdashboard?id='+id;
    }

    const gotocomplaintform = () => {
        sessionStorage.removeItem('cumaintform');
        window.location.href = 'studentdashboard?id='+id;
    }

    const clearErrors = () => {
        setHallerr(false); setRoomerr(false); setTitleerr(false); setBodyerr(false);
    }

    const proceed = () => {
        clearErrors();
        const hall = document.getElementById('hallselect') as HTMLSelectElement;
        const room = document.getElementById('roominput') as HTMLInputElement;
        const title = document.getElementById('complainttitle') as HTMLSelectElement;
        const body = document.getElementById('complaintbody') as HTMLTextAreaElement;
        let error = false;

        if(!hall.value){ error = true; setHallerr(true); }

        if(!room.value){ error = true; setRoomerr(true); }

        if(!title.value){ error = true; setTitleerr(true); }

        if(!body.value){ error = true; setBodyerr(true); }

        if(avdate==='' || avtime===''){ error=true; setDTerr(true); }
        
        if(!error){
            const updatedform = {...form};
            updatedform.body = body.value;
            updatedform.title = title.value;
            updatedform.specifics1 = hall.value;
            updatedform.specifics2 = room.value;
            updatedform.avdate = avdate;
            updatedform.avtime = avtime;

            const res = datefunc();
            updatedform.day = res.day;
            updatedform.time = res.time;

            setLoading(true);
            sessionStorage.setItem('cumaintform', JSON.stringify(updatedform))
            window.location.href = '/complaintphoto?id='+id;
            /*push(issuesref, updatedform).then((url)=>{
                console.log(url);
                window.location.href = '/complaintphoto?id='+id;
                setLoading(false);
            });*/
           // window.location.href = '/complaintphoto?id='+id;
        } 
    }

    const datefunc = () => {
        const full = new Date().toString();
        const arr = full.split(' ');
        const day = arr.slice(1, 4).join(' ');
        const time = arr[4];
        return {day: day, time: time};
    }

    return (
        <div>
            <Header/>
            <div className="pt-20 w-full flex flex-row items-start justify-center">
                <div className="w-[500px] py-8 px-10 h-auto text-center rounded-lg shadow-xl bg-white mr-10" style={{border:'2px solid rgba(228, 231, 236, 1)'}}>
                    <div>
                        <div className="text-lg font-bold">Hall Of Residence Form</div>
                        <p className="text-sm font-semibold text-[#667185] mt-0.5">Fill out these details to register your complaints</p>
                    </div>

                    <div>
                        <div className="flex flex-col items-start justify-start mt-4">
                            <label className="text-xs font-semibold mb-2 flex flex-row items-center justify-start">
                                Hall Of Residence
                                <div className="w-1 h-1 bg-red-700 rounded-full ml-2" style={{display:hallerr?'flex':'none'}}></div>
                            </label>
                            <select id="hallselect" className="h-10 w-full text-sm rounded-md px-2" style={{border:'1px solid grey'}}>
                                    <option value="" >Select your Hall of Residence</option>
                                    <option value="Peter Hall">Peter Hall</option>
                                    <option value="John Hall">John Hall</option>
                                    <option value="Paul Hall">Paul Hall</option>
                                    <option value="Joseph Hall">Joseph Hall</option>
                                    <option value="Daniel Hall">Daniel Hall</option>
                                    <option value="Esther Hall">Esther Hall</option>
                                    <option value="Mary Hall">Mary Hall</option>
                                    <option value="Lydia Hall">Lydia Hall</option>
                                    <option value="Deborah Hall">Deborah Hall</option>
                                    <option value="Dorcas Hall">Dorcas Hall</option>
                                </select> 
                        </div>

                        <div className="flex flex-row items-start justify-between mt-4">
                            <div className="w-[48%] flex flex-col items-start justify-start">
                                <label className="text-xs font-semibold mb-2 flex flex-row items-center justify-start">
                                    Room Number
                                    <div className="w-1 h-1 bg-red-700 rounded-full ml-2" style={{display:roomerr?'flex':'none'}}></div>
                                </label>
                                <input id="roominput" className="h-10 w-full text-sm rounded-md px-2"  style={{border:'1px solid grey'}} type="text" placeholder="A310"/>
                            </div>
                            <div className="w-[48%] flex flex-col items-start justify-start">
                                <label className="text-xs font-semibold mb-2 flex flex-row items-center justify-start">
                                    Area of Complaint
                                    <div className="w-1 h-1 bg-red-700 rounded-full ml-2" style={{display:titleerr?'flex':'none'}}></div>
                                </label>
                                <select id="complainttitle" className="h-10 w-full text-sm rounded-md px-1" style={{border:'1px solid grey'}}>
                                    <option value="" >select...</option>
                                    <option value="Electricity">Electricity</option>
                                    <option value="Water">Water</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Toilet">Toilet</option>
                                    <option value="Others">Others</option>
                                </select>  
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-start mt-4">
                            <label className="text-xs font-semibold mb-2 flex flex-row items-center justify-start">
                                Write your complaint
                                <div className="w-1 h-1 bg-red-700 rounded-full ml-2" style={{display:bodyerr?'flex':'none'}}></div>
                            </label>
                            <textarea id="complaintbody" className="h-28 w-full text-sm p-2 resize-none rounded-md" style={{border:'1px solid grey'}}></textarea>
                            <label className="text-xs font-semibold mt-2">{`Keep this simple ${50} character`}</label>
                        </div>
                        
                        <div className="flex flex-row items-center justify-between mt-6">
                            <button className="w-32 bg-white text-[#814789] text-sm font-semibold py-3 rounded-md" style={{border:'1.5px #814789 solid'}} onClick={()=>{ gotocomplaintform(); }}> 
                                Back
                            </button>
                            <button className="w-32 bg-[#814789] text-white text-sm font-semibold py-3 rounded-md flex flex-row items-center justify-center" onClick={()=>{ proceed(); }}>
                                <div style={{display:loading?'none':'flex'}}>Proceed</div>
                                <LoadingSpinner
                                    loading={loading}
                                    borderColor="white"
                                    borderTopColor="transparent"
                                    size={"20px"}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <Formlist
                    showerr={dterr}
                    setDate={(date)=>{ setAvdate(date) }}
                    setTime={(time)=>{ setAvtime(time); }}
                    backtodashboard={()=>{ gotodashboard(); }}
                />
            </div>

            <Footer/>
        </div>
    )
}
