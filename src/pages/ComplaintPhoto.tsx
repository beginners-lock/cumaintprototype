import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/Spinner";

export default function ComplaintPhoto(){
    const [uploading, setUploading] = useState(false);

    const uploadClick = () => {
        const file = document.getElementById('fileupload') as HTMLInputElement;
        file.click();
    }

    const dropFile = (e: React.DragEvent<HTMLDivElement>) => {
        const file = e.target;
        console.log(file);
    }

    return(
        <div>
           <Header/>
           <div className="h-[100vh] w-full flex flex-col items-center justify-center">
                <div className="font-semibold text-md">Upload photos of damaged things that need repair</div>
                <div className="mt-4 bg-gray-100 rounded-lg w-[700px] h-[350px] flex flex-row items-center justify-center" onDrop={(e)=>{ dropFile(e); }}>
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
                <input id="fileupload" type="file" className="invisible"/>
                <div className="w-[700px] flex flex-row items-center justify-end">
                    <button className="w-32 bg-[#814789] text-white text-sm font-semibold py-3 rounded-md flex flex-row items-center justify-center">
                        Proceed
                    </button>
                </div>
           </div>
           <Footer/>
        </div>
    )
}