import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';

export default function Complaintarea() {
    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

    const [active, setActive] = useState<string|null>('');

    useEffect(()=>{
        console.log(active);
        sessionStorage.removeItem('cumaintform');
    }, []);

    const clearinput = () => {
        let el = document.getElementById('complaintpageinput') as HTMLInputElement;
        el.value = '';
    }

    const complaint = async () => {
        if(active){
            let data = JSON.stringify({
                userid: id,
                building: active,
                title: '',
                body: '',
                day: '',
                time:'',
                status: 'pending',
                specifics1: '',
                specifics2: ''
            });
            sessionStorage.setItem('cumaintform', data);
            
            if(!['Hall of Residence', 'College Building'].includes(active)){
                console.log(data);
                window.location.href = '/othercomplaints?id='+id
            }else{
                if(active==='Hall of Residence'){
                    window.location.href = '/hallform?id='+id
                }else{
                    window.location.href = '/collegeform?id='+id
                }
            }
        }else{
            let el = document.getElementById('complaintpageinput') as HTMLInputElement;
            
            if(el.value.trim()!==''){
                let words = el.value.split(' ');
                words = words.filter((word)=>{ return(word.slice(0,1).toUpperCase+word.slice(1)); });
                let normal = words.join(' ');

                let data = JSON.stringify({
                    userid: id,
                    building: normal,
                    title: '',
                    body: '',
                    day: '',
                    time:'',
                    status: 'pending',
                    specifics1: '',
                    specifics2: ''
                });
                
                sessionStorage.setItem('cumaintform', data);
                window.location.href = '/othercomplaints?id='+id
            }
        }
    }

    return (
        <div>
            <Header/>
            <div className="pt-28 flex items-center justify-center">
                    <div className="w-[410px] flex flex-row flex-wrap box-border">
                        <div>
                            <p className="text-lg text-[#808080] font-semibold">Hey, John Abraham</p>
                            <div className="text-xl font-semibold mt-0.5">Where is your area of complaint?</div>
                        </div>

                        <div className="mt-4 flex flex-row flex-wrap justify-center items-start">
                            <div className="mt-2 w-[200px] px-2 py-3 box-border rounded-md flex flex-row items-center font-semibold cursor-pointer" style={{border:active==='Hall of Residence'?'2px #814789 solid':'1px transparent solid', color:active==='Hall of Residence'?'black':'#667185'}}
                                onClick={()=>{setActive('Hall of Residence'); clearinput();}}
                            >
                                <input type="checkbox" className="mr-2 w-5 h-5 accent-[#814789]" checked={active==='Hall of Residence'?true:false} onChange={()=>{ }}/>
                                Hall of Residence
                            </div>

                            <div className="mt-2 w-[200px] px-2 py-3 box-border rounded-md flex flex-row items-center font-semibold cursor-pointer" style={{border:active==='College Building'?'2px #814789 solid':'1px transparent solid', color:active==='College Building'?'black':'#667185'}}
                                onClick={()=>{setActive('College Building'); clearinput();}}
                            >
                                <input type="checkbox" className="mr-2 w-5 h-5 accent-[#814789]" checked={active==='College Building'?true:false} onChange={()=>{ }}/>
                                College Building
                            </div>

                            <div className="mt-2 w-[200px] px-2 py-3 box-border rounded-md flex flex-row items-center font-semibold cursor-pointer" style={{border:active==='Cafeteria'?'2px #814789 solid':'1px transparent solid', color:active==='Cafeteria'?'black':'#667185'}}
                                onClick={()=>{setActive('Cafeteria'); clearinput();}}
                            >
                                <input type="checkbox" className="mr-2 w-5 h-5 accent-[#814789]" checked={active==='Cafeteria'?true:false} onChange={()=>{ }}/>
                                Cafeteria
                            </div>

                            <div className="mt-2 w-[200px] px-2 py-3 box-border rounded-md flex flex-row items-center font-semibold cursor-pointer" style={{border:active==='Chapel'?'2px #814789 solid':'1px transparent solid', color:active==='Chapel'?'black':'#667185'}}
                                onClick={()=>{setActive('Chapel'); clearinput();}}
                            >
                                <input type="checkbox" className="mr-2 w-5 h-5 accent-[#814789]" checked={active==='Chapel'?true:false} onChange={()=>{ }}/>
                                Chapel
                            </div>

                            <div className="mt-2 w-[200px] px-2 py-3 box-border rounded-md flex flex-row items-center font-semibold cursor-pointer" style={{border:active==='Library'?'2px #814789 solid':'1px transparent solid', color:active==='Library'?'black':'#667185'}}
                                onClick={()=>{setActive('Library'); clearinput();}}
                            >
                                <input type="checkbox" className="mr-2 w-5 h-5 accent-[#814789]" checked={active==='Library'?true:false} onChange={()=>{ }}/>
                                Library
                            </div>

                            <div className="mt-2 w-[200px] px-2 py-3 box-border rounded-md flex flex-row items-center font-semibold cursor-pointer" style={{border:active==='Shopping Mall'?'2px #814789 solid':'1px transparent solid', color:active==='Shopping Mall'?'black':'#667185'}}
                                onClick={()=>{setActive('Shopping Mall'); clearinput();}}
                            >
                                <input type="checkbox" className="mr-2 w-5 h-5 accent-[#814789]" checked={active==='Shopping Mall'?true:false} onChange={()=>{ }}/>
                                Shopping Mall
                            </div>

                            <div className="mt-8 w-[80%]">
                                <div className="-w-full flex flex-row items-center justify-between mb-2">
                                    <p className="text-sm font-semibold">Not listed here?</p>
                                    <img src="icons/help-circle.svg" alt="" />
                                </div>

                                <input id="complaintpageinput" className="h-10 w-full text-sm rounded-md px-2" style={{border:'1px solid grey'}} type="text" placeholder="Write it here..." onChange={()=>{ if(active!==null){ setActive(null); } }}/>
                            </div>

                            <button className="w-[80%] bg-[#814789] text-white text-sm font-semibold py-3 rounded-md mt-6 flex flex-row items-center justify-center" onClick={()=>{ complaint(); }}>
                                Continue
                            </button>
                        </div>
                    </div>
                
            </div>
            <Footer/>
        </div>
    );
}
