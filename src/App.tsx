import './App.css';
import { Route, Routes } from "react-router-dom";
import StudentLogin from './pages/StudentLogin';
import Createaccount from './pages/Createaccount';
import Hallform from './pages/Hallform';
import Admindashboard from './pages/Admindashboard';
import ComplaintPhoto from './pages/ComplaintPhoto';
import AdminLogin from './pages/AdminLogin';
import StaffLogin from './pages/StaffLogin';
import CreateStaffAcount from './pages/CreateStaff';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import Feedback from './pages/Feedback';


function App() {
	return (
		<div id="appdiv" className='w-full h-full overflow-x-hidden'>
			<div id="maincontainer" className='w-full h-full'>
				<Routes>
					<Route path="/" element={ <StudentLogin/> }></Route>
					<Route path="/studentlogin" element={ <StudentLogin/> }></Route>
					<Route path="/adminlogin" element={ <AdminLogin/> }></Route>
					<Route path="/stafflogin" element={ <StaffLogin/> }></Route>
					<Route path="/studentdashboard" element={ <StudentDashboard/>  }></Route>
					<Route path="/staffdashboard" element={ <StaffDashboard/>  }></Route>
					<Route path="/admindashboard" element={ <Admindashboard/>  }></Route>
					<Route path="/createstudentaccount" element={ <Createaccount/>  }></Route>
					<Route path="/createstaffaccount" element={ <CreateStaffAcount/>  }></Route>
					<Route path="/hallform" element={ <Hallform/>  }></Route>
					<Route path="/complaintphoto" element={ <ComplaintPhoto/>  }></Route>
					<Route path="/feedback" element={ <Feedback/>  }></Route>
				</Routes>
			</div>
		</div>	
	);
}

export default App

/**
 * <div id="maincontainer" className='w-full h-full'>
				<Routes>
					<Route path="/" element={ <Login/> }></Route>
					<Route path="/login" element={ <Login/> }></Route>
					<Route path="/dashboard" element={ <Dashboard/>  }></Route>
					<Route path="/admindashboard" element={ <Admindashboard/>  }></Route>
					<Route path="/createaccount" element={ <Createaccount/>  }></Route>
					<Route path="/hallform" element={ <Hallform/>  }></Route>
				</Routes>
			</div>
 */