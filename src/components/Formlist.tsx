type FormlistProps = {
    showerr: boolean
    backtodashboard: ()=>void
    setDate: (date: string)=>void
    setTime: (time: string)=>void
}

 export default function Formlist({ showerr, backtodashboard, setDate, setTime }: FormlistProps) {
    const dateFunct = () => {
        const el = document.getElementById('formdatechooser') as HTMLInputElement;
        setDate(el.value);
    }

    const timeFunct = () => {
        const el = document.getElementById('formtimechooser') as HTMLInputElement;
        setTime(el.value);
    }

   return (
     <div className='bg-white rounded-md shadow-xl w-[350px] py-8 px-6 h-auto flex flex-col justify-between items-start' style={{border:'1px solid rgba(228, 231, 236, 1)'}}>
        <ul>
            <div className="font-bold flex flex-row items-center justify-start">Time of Student Availability 
                <div className="ml-4 w-3 h-3 rounded-full bg-red-600" style={{display:showerr?'flex':'none'}}></div></div>
            <p className="text-sm font-semibold text-[#667185] mt-0.5">Fill out the time of your availability for the maintenace to be carried out.</p>
            <div className="mt-4">
                <div className="font-semibold text-sm">Date</div>
                <input id="formdatechooser" className="mt-2 cursor-pointer rounded-lg px-2 py-1" type="date" style={{border:'1px grey solid'}}onChange={()=>{ dateFunct(); }}/>
            </div>

            <div className="mt-8">
                <div className="font-semibold text-sm">Time</div>
                <input id="formtimechooser" className="mt-2 cursor-pointer rounded-lg px-2 py-1" type="time" style={{border:'1px grey solid'}} onChange={()=>{ timeFunct(); }}/>
            </div>

            <button className="w-full bg-[#814789] text-white text-sm font-semibold py-3 rounded-md mt-8" onClick={()=>{ backtodashboard(); }}>
                Back to dashboard
            </button>
        </ul>
       <div className='mt-6 flex flex-col items-star justify-start'>
            <h3 className='font-semibold tex-sm'>Need Help?</h3>
            <p className='text-[#98A2B3] text-sm w-52'>
                Do you have any issues  or incomplete tasks on your form?
            </p>

            <button className='mt-2 text-[#667185] w-28 font-semibold py-2 flex flex-row justify-center items-center text-sm rounded-md' style={{border:'1px #667185 solid'}}>
                Contact us
            </button>
       </div>
     </div>
   )
 }
 

 /**
  * <div className='bg-white rounded-md shadow-xl w-[350px] py-8 px-6 h-auto flex flex-col justify-between items-start' style={{border:'1px solid rgba(228, 231, 236, 1)'}}>
        <ul>
            <li className="mb-6 w-full flex flex-row items-center justify-start flex-wrap">
                <div className='w-8 h-8 rounded-full flex flex-row items-center justify-center font-bold' style={{backgroundColor:active===1?'#814789':'white', color:active===1?'white':'#98A2B3', border:active===1?'1px #814789 solid':'1px #98A2B3 solid'}}>1</div>
                <div className='ml-2'>
                    <div className="text-md font-semibold" style={{color:active===1?'black':'#667185'}}>Hall Of Residence Form</div>
                    <p className="text-xs" style={{color:active===1?'#475367':'#667185'}}>Fill out these details to register your complaint</p>
                </div>
            </li>
            <li className="mb-6 w-full flex flex-row items-center justify-start flex-wrap">
                <div className='w-8 h-8 rounded-full flex flex-row items-center justify-center font-bold' style={{backgroundColor:active===2?'#814789':'white', color:active===2?'white':'#98A2B3', border:active===2?'1px #814789 solid':'1px #98A2B3 solid'}}>2</div>
                <div className='ml-2'>
                    <div className="text-md font-semibold" style={{color:active===2?'black':'#667185'}}>College Building </div>
                    <p className="text-xs" style={{color:active===2?'#475367':'#667185'}}>Fill out these details to register your complaint</p>
                </div>
            </li>
            <li className="mb-6 w-full flex flex-row items-center justify-start flex-wrap">
                <div className='w-8 h-8 rounded-full flex flex-row items-center justify-center font-bold' style={{backgroundColor:active===3?'#814789':'white', color:active===3?'white':'#98A2B3', border:active===3?'1px #814789 solid':'1px #98A2B3 solid'}}>3</div>
                <div className='ml-2'>
                    <div className="text-md font-semibold" style={{color:active===3?'black':'#667185'}}>Other Complaints</div>
                    <p className="text-xs" style={{color:active===3?'#475367':'#667185'}}>Fill out these details to register your complaint</p>
                </div>
            </li>
            <li className="mb-6 w-full flex flex-row items-center justify-start flex-wrap">
                <div className='w-8 h-8 rounded-full flex flex-row items-center justify-center font-bold' style={{backgroundColor:active===4?'#814789':'white', color:active===4?'white':'#98A2B3', border:active===4?'1px #814789 solid':'1px #98A2B3 solid'}}>4</div>
                <div className='ml-2'>
                    <div className="text-md font-semibold" style={{color:active===4?'black':'#667185'}}>Summary</div>
                    <p></p>
                </div>
            </li>

            <button className="w-full bg-[#814789] text-white text-sm font-semibold py-3 rounded-md mt-4" onClick={()=>{ backtodashboard(); }}>
                Back to dashboard
            </button>
        </ul>
       <div className='mt-6 flex flex-col items-star justify-start'>
            <h3 className='font-semibold tex-sm'>Need Help?</h3>
            <p className='text-[#98A2B3] text-sm w-52'>
                Do you have any issues  or incomplete tasks on your form?
            </p>

            <button className='mt-2 text-[#667185] w-28 font-semibold py-2 flex flex-row justify-center items-center text-sm rounded-md' style={{border:'1px #667185 solid'}}>
                Contact us
            </button>
       </div>
    </div>
  * 
  */