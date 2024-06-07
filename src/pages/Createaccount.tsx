import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import { useState } from "react";
import { firebaseConfig } from "../firebaseconfig.ts";
import { initializeApp } from "firebase/app";
import { ref, getDatabase, get, push } from "firebase/database";
import AuthModal from "../components/Authmodal.tsx";
import { CREATE_ACC_INSTRUCTIONS, EMAIL_ALREADY_REGISTERD, ACCOUNT_CREATED } from "../constants/messages.tsx";
import LoadingSpinner from "../components/Spinner.tsx";


export default function Createaccount() {
    initializeApp(firebaseConfig);
    const db = getDatabase();

    const [fnameerr, setFnameerr] = useState(false);
    const [lnameerr, setLnameerr] = useState(false);
    const [emailerr, setEmailerr] = useState(false);
    const [passworderr, setPassworderr] = useState(false);
    const [showerrmodal, setShowerrmodal] = useState(false);
    const [errbody, setErrbody] = useState<string|JSX.Element>('');
    const [loading, setLoading] = useState(false);
    const [modalcolor, setModalcolor] = useState('red');
    const [passvisible, setPassvisible] = useState(false);

    const clearwarnings = () => {
        setFnameerr(false); setLnameerr(false); setEmailerr(false); setPassworderr(false); 
    }

    const createaccount = () => {
        clearwarnings();
        let fnameEl = document.getElementById('fnameinput') as HTMLInputElement;
        let lnameEl = document.getElementById('lnameinput') as HTMLInputElement;
        let emailEl = document.getElementById('emailinput') as HTMLInputElement;
        let passwordEl = document.getElementById('passwordinput') as HTMLInputElement;
        let error = false;

        let fname = fnameEl.value; let lname = lnameEl.value; let email = emailEl.value; let password = passwordEl.value;

        if(fname==='' || fname.toLowerCase()!==email.slice(0, email.indexOf('.'))){
            error=true; setFnameerr(true); setErrbody(CREATE_ACC_INSTRUCTIONS);
        }

        if(lname.toLowerCase()==='' || lname.toLowerCase()!==email.slice(email.indexOf('.')+1, email.indexOf('@'))){
            error=true; setLnameerr(true); setErrbody(CREATE_ACC_INSTRUCTIONS);
        }

        if(!email.includes('@stu.cu.edu.ng') || email.length<17){
            error=true; setEmailerr(true); setErrbody(CREATE_ACC_INSTRUCTIONS);
        }

        if(password==='' || password.length<8){
            error=true; setPassworderr(true); setErrbody(CREATE_ACC_INSTRUCTIONS);
        }

        if(error){
            setShowerrmodal(true); setModalcolor('red');
        }else{
            setLoading(true);
            let usersRef = ref(db, 'cumaint/Users');

            get(usersRef).then((snapshot)=>{
                let users = snapshot.val()
                let similarusers = null;
                
                if(users){
                    users = Object.values(users);
                    let found = users.find((user: any) => user.email===email)
                    similarusers = found ? true : false;
                }

                if(similarusers){
                    setShowerrmodal(true); setErrbody(EMAIL_ALREADY_REGISTERD); setModalcolor('red');
                    setLoading(false);
                }else{
                    let userdata = {
                        firstname: fname,
                        lastname: lname,
                        email: email,
                        password: password,
                        verified: false
                    };
                    push(usersRef, userdata).then((val)=>{
                        console.log(val.key);
                        setShowerrmodal(true); setErrbody(ACCOUNT_CREATED); setModalcolor('green'); 
                        setLoading(false);

                        //User session setup stuff
                        let loggedinuser = { id: val.key, ...userdata };
                        sessionStorage.setItem('cumainsession', JSON.stringify(loggedinuser));

                        window.location.href = '/dashboard?id='+val.key;
                    });
                }
            })
        }
    }

    return (
        <div className='flex flex-col items-center justify-start'>
            <Header />

            <div className='pt-[70px] flex flex-col items-center justify-start'>
                <div id='form-container' className="rounded-lg shadow-xl py-6 px-10 w-96 bg-white" style={{border:'1px solid #D0D5DD'}}>
                    <div className='flex flex-col items-center justify-start'>
                        <div className='font-bold text-2xl'>Create account</div>
                        <p className='font-semibold text-center text-sm text-[#667185] mt-0.5'>Sign up to gain access to the maintenace platform</p>
                        
                        <div className='w-full mt-3'>
                            <div className='text-xs font-semibold mb-2 flex flex-row items-center'>First Name <div style={{display:fnameerr?'flex':'none'}} className="bg-red-700 ml-2 w-1.5 h-1.5 rounded-full"></div></div>
                            <div className='flex flex-row items-center justify-start px-2 box-border rounded-md' style={{border:'1px solid grey'}}>
                                <input id="fnameinput" className='w-full h-10 text-sm focus:outline-none active:outline-none' style={{border:'none'}} type="name" placeholder='First Name' />
                            </div>
                        </div>

                        <div className='w-full mt-4'>
                            <div className='text-xs font-semibold mb-2 flex flex-row items-center'>Last Name <div style={{display:lnameerr?'flex':'none'}} className="bg-red-700 ml-2 w-1.5 h-1.5 rounded-full"></div></div>
                            <div className='flex flex-row items-center justify-start px-2 box-border rounded-md' style={{border:'1px solid grey'}}>
                                <input id="lnameinput" className='w-full h-10 text-sm focus:outline-none active:outline-none' style={{border:'none'}} type="name" placeholder='Last Name'/>
                            </div>
                        </div>

                        <div className='w-full mt-4'>
                            <div className='text-xs font-semibold mb-2 flex flex-row items-center'>Email <div style={{display:emailerr?'flex':'none'}} className="bg-red-700 ml-2 w-1.5 h-1.5 rounded-full"></div></div>
                            <div className='flex flex-row items-center justify-start px-2 box-border rounded-md' style={{border:'1px solid grey'}}>
                                <input id="emailinput" className='w-full h-10 text-sm focus:outline-none active:outline-none' style={{border:'none'}} type="email" placeholder='Enter Password'/>
                                <img src="icons/envelope.svg" alt="email" />
                            </div>
                        </div>

                        <div className='w-full mt-4'>
                            <div className='text-xs font-semibold mb-2 flex flex-row items-center'>Password <div style={{display:passworderr?'flex':'none'}} className="bg-red-700 ml-2 w-1.5 h-1.5 rounded-full"></div></div>
                            <div className='flex flex-row items-center justify-start px-2 box-border rounded-md' style={{border:'1px solid grey'}}>
                                <input id="passwordinput" className='w-full h-10 text-sm focus:outline-none active:outline-none' style={{border:'none'}} type={passvisible?'text':"password"} placeholder='Enter Password'/>
                                <img src="icons/eye-slash.svg" alt="toggle" onClick={()=>{ setPassvisible(state =>{ return !state; }); }} />
                            </div>
                        </div>

                        <div className='mt-4 text-sm w-full flex flex-row items-center justify-between'>
                            <p className="font-semibold text-xs">Already have an account?</p>
                            <a className="font-semibold text-xs text-[#814789]" href="/login">Login</a>
                        </div>

                        <button className="w-full bg-[#814789] text-white text-sm font-semibold py-3 rounded-md mt-6 flex flex-row justify-center" onClick={()=>{ if(!loading){ createaccount(); } }}>
                            <div style={{display:loading?'none':'flex'}}>Create Account</div>
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
    )
}
