import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import AuthModal from '../components/Authmodal.tsx';
import { useState } from "react";
import { firebaseConfig } from "../firebaseconfig.ts";
import { initializeApp } from "firebase/app";
import LoadingSpinner from "../components/Spinner.tsx";
import { ref, getDatabase, get } from "firebase/database";
import { ADMIN_LOGIN_SUCCESS, WRONG_CREDS } from '../constants/messages.tsx';

export default function AdminLogin(){
    initializeApp(firebaseConfig);
    const db = getDatabase();

    const [emailerr, setEmailerr] = useState(false);
    const [passworderr, setPassworderr] = useState(false);
    const [showerrmodal, setShowerrmodal] = useState(false);
    const [errbody, setErrbody] = useState<string|JSX.Element>('');
    const [loading, setLoading] = useState(false);
    const [modalcolor, setModalcolor] = useState('red');
    const [passvisible, setPassvisible] = useState(false);

    const clearwarnings = () => {
        setEmailerr(false); setPassworderr(false); 
    }

    const login = () => {
        clearwarnings();
        let emailEl = document.getElementById('emailinput') as HTMLInputElement;
        let passwordEl = document.getElementById('passwordinput') as HTMLInputElement;

        let email = emailEl.value; let password = passwordEl.value;
        setLoading(true);

        //Check if it's the admin email else do the login process for a user
        if(email===import.meta.env.VITE_ADMIN_EMAIL && password===import.meta.env.VITE_ADMIN_PASSWORD){
            setShowerrmodal(true); setModalcolor('green'); 
            setErrbody(ADMIN_LOGIN_SUCCESS); setLoading(false);
            window.location.href = '/admindashboard?id=admin'+import.meta.env.VITE_ADMIN_ID; 
        }else{
            setShowerrmodal(true); setModalcolor('red'); 
            setErrbody(WRONG_CREDS); setLoading(false);
        }
    }

    return(
        <div className='flex flex-col items-center justify-start'>
            <Header />

            <div className='pt-28 flex flex-col items-center justify-start'>
                <div id='form-container' className="rounded-lg shadow-xl p-10 w-96 bg-white" style={{border:'1px solid #D0D5DD'}}>
                    <div className='flex flex-col items-center justify-start'>
                        <div className='font-bold text-2xl'>Admin Login</div>
                        <p className='font-semibold text-center text-sm text-[#667185] mt-0.5'>Enter your credentials to acces your account</p>
                        
                        <div className='w-full mt-6'>  
                            <div className='text-xs font-semibold mb-2 flex flex-row items-center'>Email <div style={{display:emailerr?'flex':'none'}} className="bg-red-700 ml-2 w-1.5 h-1.5 rounded-full"></div></div>
                            <div id='form-input' className='flex flex-row items-center justify-start px-2 box-border rounded-md' style={{border:'1px solid grey'}}>
                                <input id="emailinput" className='w-full h-10 text-sm focus:outline-none active:outline-none' style={{border:'none'}} type="email" placeholder='Enter Email' />
                                <img className='w-4 ml-2' src="icons/envelope.svg" alt="email"/>
                            </div>
                        </div>
                        <div className='w-full mt-6'>
                            <div className='text-xs font-semibold mb-2 flex flex-row items-center'>Password <div style={{display:passworderr?'flex':'none'}} className="bg-red-700 ml-2 w-1.5 h-1.5 rounded-full"></div></div>
                            <div id='form-input' className='flex flex-row items-center justify-start px-2 box-border rounded-md' style={{border:'1px solid grey'}}>
                                <input id="passwordinput" className='w-full h-10 text-sm focus:outline-none active:outline-none'  style={{border:'none'}} type={passvisible?'text':"password"} placeholder='Enter Password'/>
                                <img className='w-4 ml-2' src="icons/eye-slash.svg" alt="toggle" onClick={()=>{ setPassvisible(state =>{ return !state; }); }}/>
                            </div>
                        </div>

                        <button className="flex flex-row items-center justify-center w-full bg-[#814789] text-white text-sm font-semibold py-3 rounded-md mt-12" onClick={()=>{ if(!loading){ login(); } }}>
                            <div style={{display:loading?'none':'flex'}}>Log into Account</div>
                            <LoadingSpinner
                                loading={loading}
                                size={'20px'}
                                borderTopColor={"transparent"}
                                borderColor={"white"}
                            />
                        </button>

                    </div>
                </div>
                <AuthModal
                    show={showerrmodal}
                    body={errbody}
                    close={()=>{ setShowerrmodal(false); }}
                    color={modalcolor}
                />
            </div>

            <Footer />
        </div>
    );
};