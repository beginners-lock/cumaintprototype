import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Createaccount from './pages/Createaccount';
import Hallform from './pages/Hallform';
import Collegeform from './pages/Collegeform';
import Complaintarea from './pages/Complaintarea';
import Admindashboard from './pages/Admindashboard';
import Othersform from './pages/Othersform';


function App() {
	return (
		<div id="appdiv" className='w-full h-full'>
			<div id="maincontainer" className='w-full h-full'>
				<Routes>
					<Route path="/" element={ <Login/> }></Route>
					<Route path="/login" element={ <Login/> }></Route>
					<Route path="/dashboard" element={ <Dashboard/>  }></Route>
					<Route path="/admindashboard" element={ <Admindashboard/>  }></Route>
					<Route path="/createaccount" element={ <Createaccount/>  }></Route>
					<Route path="/hallform" element={ <Hallform/>  }></Route>
				</Routes>
			</div>
		</div>	
	);
}

export default App
