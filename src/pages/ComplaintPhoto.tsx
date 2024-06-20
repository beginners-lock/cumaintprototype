import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/Spinner";
import { firebaseConfig } from "../firebaseconfig.ts";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase, push, ref as dbref } from "firebase/database";

export default function ComplaintPhoto(){
    const [uploading, setUploading] = useState(false);

    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

    const uploadClick = () => {
        if(!uploading){
            const file = document.getElementById('fileupload') as HTMLInputElement;
        file.click();
        }
    }

    const uploadFile = () => {
        const el = document.getElementById('fileupload') as HTMLInputElement;
        console.log(el.files![0]);

        let session = sessionStorage.getItem('cumaintform');
        if(session){
            setUploading(true);
             initializeApp(firebaseConfig);
            const storage = getStorage();
            const db = getDatabase();
            const audioref = ref(storage, 'cumaint/issuespics/pic');
            const issuesref = dbref(db, 'cumaint/Issues');
            
            uploadBytes(audioref, el.files![0]).then((snapshot)=>{
                getDownloadURL((snapshot.ref)).then(async (url)=>{
                    let form = JSON.parse(session);
                    form.pic = url;
                    push(issuesref).then(snapshot => {
                        window.location.href="/studentdashboard?id="+id;
                    });
                });
            });
        }

    }

    return(
        <div>
           <Header/>
           <div className="h-[100vh] w-full flex flex-col items-center justify-center">
                <div className="font-semibold text-md">Upload photos of damaged things that need repair</div>
                <div className="mt-4 bg-gray-100 rounded-lg w-[700px] h-[350px] flex flex-row items-center justify-center">
                    <div className="absolute px-2.5 py-1.5 text-white bg-gray-400 rounded-md font-semibold cursor-pointer shadow-2xl" onClick={()=>{ uploadClick(); }}>
                        {
                            uploading?
                            <LoadingSpinner
                                loading={uploading}
                                size={"20px"}
                                borderColor="white"
                                borderTopColor="transparent"
                            />
                            :'Click to upload'
                        }
                    </div>
                </div>
                <input id="fileupload" type="file" className="invisible" onChange={()=>{ uploadFile(); }}/>
                <div className="w-[700px] flex flex-row items-center justify-end">
                    <button className="w-32 bg-[#814789] text-white text-sm font-semibold py-3 rounded-md flex flex-row items-center justify-center">
                        Proceed
                    </button>
                </div>
           </div>
           <Footer/>
        </div>
    );
}