import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { firebaseConfig } from "../firebaseconfig.ts";
import { initializeApp } from "firebase/app";
import { ref, getDatabase, push, onValue, get } from "firebase/database";

export default function Feedback(){
    initializeApp(firebaseConfig);
    const db = getDatabase();

    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');
    const complaintid = params.get('complaintid');
    
    const complaintref = ref(db, 'cumaint/Issues/'+complaintid);
    const userref = ref(db, 'cumaint/Users/'+id);

    const [complaint, setComplaint] = useState<any>(null)
    const [user, setUser] = useState<any>(null);

    useEffect(()=>{
        get(userref).then((snapshot)=>{
            const data = snapshot.val();
            setUser(data);
        });

        const unsub = onValue(complaintref, (snapshot) => {
            const data = snapshot.val();
            
            if(data){
                setComplaint(data);
            }else{
                setComplaint({});
            }
        }); 

        return ()=>{ unsub(); }
    }, []);

    const sendfeedback = () => {
        const msgel = document.getElementById('feedbacktextarea') as HTMLTextAreaElement;
        const feedbackref = ref(db, 'cumaint/Issues/'+complaintid+'/feedback');
        push(feedbackref, { name:user?.firstname+' '+user?.lastname, msg: msgel.value}).then(()=>{ msgel.value=""; });
    }

    return(
        <div>
            <Header/>

            <div className="pt-20 px-10 flex flex-row items-start justify-start">
                <div className="w-[30%]">
                    <div className="font-semibold text-md">
                    {
                        'Date reported: '+complaint?.day+'     '+complaint?.time
                    }
                    </div>

                    <div className="font-bold text-lg mt-4">{complaint?.specifics1}</div>
                    <div className="font-bold text-lg">{complaint?.specifics2.toUpperCase()}</div>
                </div>
                <div className="w-[50%]">
                    <div className='text-lg font-bold'>{complaint?.title}</div>
                    <div className='text-md italic'>{complaint?.body}</div>
                    <a target="_blank" className="underline text-[#0000EE] mt-4" href={complaint?.pic}>Image Link</a>
                </div>
                <div className="w-[20%]">
                    <div className='text-md box-border font-bold' style={{color:complaint?.status==='pending'?'orange':complaint?.status==='solved'?'green':'red'}}>{complaint?.status.toUpperCase()}</div>
                    
                    <div className="text-md mt-4 font-semibold">Student Availability</div>
                    <div className="text-sm ">{complaint?.avdate +'  '+complaint?.avtime}</div>
                </div>
            </div>
            <div className="mt-4 w-full flex flex-row items-start justify-start">
                <div className="w-[50%] pl-10 pr-4">
                    <div className="text-md font-semibold mb-2">Feedbacks</div>
                    {
                        complaint?.feedback?
                            Object.values(complaint.feedback).reverse().map((feed: any, index) => {
                                return(
                                    <div key={'feedback'+index}>
                                        <div className="text-sm">{feed?.name}</div>
                                        <div className="text-sm mb-4 pb-2" style={{borderBottom:'1px grey solid'}}>{feed?.msg}</div>
                                    </div>
                                )
                            })
                        :   'No feedbacks given yet'
                    }
                </div>
                <div className="w-[50%] pr-10 pl-4">
                    <textarea id="feedbacktextarea" placeholder="Type in your feedback" className="resize-none bg-transparent p-2 w-[450px] h-[200px]" style={{border:'1px grey solid'}}></textarea>                    
                    <div className="w-28 bg-[#814789] text-white text-sm font-semibold py-2 rounded-md flex flex-row items-center justify-center cursor-pointer" onClick={()=>{ sendfeedback(); }}>
                        Send
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}